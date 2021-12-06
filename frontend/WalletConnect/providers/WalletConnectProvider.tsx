/* eslint-disable functional/no-throw-statement */
import WalletConnect from "@walletconnect/client";
import {
  ICreateSessionOptions,
  IWalletConnectSession,
} from "@walletconnect/types";
import deepmerge from "deepmerge";
import { KeyValueStorage, ReactNativeStorageOptions } from "keyvaluestorage";
import * as React from "react";
import { Linking, Platform, Modal } from "react-native";
import useDeepCompareEffect from "use-deep-compare-effect";

import { defaultRenderQrcodeModal, formatWalletServiceUrl } from "../constants";
import { WalletConnectContext } from "../contexts";
import { useMobileRegistry, useWalletConnectContext } from "../hooks";
import {
  ConnectorEvents,
  RenderQrcodeModalCallback,
  RenderQrcodeModalProps,
  WalletConnectContextValue,
  WalletConnectProviderProps,
  WalletService,
} from "../types";

type State = {
  readonly uri?: string;
  readonly visible: boolean;
  readonly cb?: unknown;
};

const defaultState: State = Object.freeze({
  visible: false,
});

export default function WalletConnectProvider({
  children,
  renderQrcodeModal: maybeRenderQrcodeModal, //scannable QR code
  ...extras
}: Partial<WalletConnectProviderProps>): JSX.Element {
  const {
    error: walletServicesError,
    data: walletServices,
  } = useMobileRegistry();

  const [state, setState] = React.useState<State>(defaultState);
  const parentContext = useWalletConnectContext();

  const intermediateValue = React.useMemo(
    (): WalletConnectContextValue => deepmerge(parentContext, extras),
    [parentContext, extras]
  );

  const renderQrcodeModal = React.useMemo(
    () =>
      typeof maybeRenderQrcodeModal === "function"
        ? (maybeRenderQrcodeModal as RenderQrcodeModalCallback)
        : defaultRenderQrcodeModal,
    [maybeRenderQrcodeModal]
  );

  const open = React.useCallback(
    async (uri: string, cb: unknown): Promise<unknown> => {
      //NOTE: commented this original code from wallet connect module
      // if (Platform.OS === "android") {
      //   const canOpenURL = await Linking.canOpenURL(uri);
      //   if (!canOpenURL) {
      //     // Redirect the user to download a wallet.
      //     Linking.openURL("https://walletconnect.org/wallets");
      //     throw new Error("No wallets found.");
      //   }
      //   await Linking.openURL(uri);
      // }
      setState({
        uri,
        visible: true,
        cb,
      });
      return undefined;
    },
    [setState]
  );

  const close = React.useCallback((): unknown => {
    setState((currentState) => {
      const { cb } = currentState;
      setTimeout(() => typeof cb === "function" && cb(), 0);
      return {
        uri: undefined,
        visible: false,
        cb: undefined,
      };
    });
    return undefined;
  }, [setState]);

  const qrcodeModal = React.useMemo(
    () => ({
      open,
      close,
    }),
    [open, close]
  );

  const { storageOptions, redirectUrl } = intermediateValue;

  const createStorage = React.useCallback(
    (storageOptions: ReactNativeStorageOptions): KeyValueStorage => {
      return new KeyValueStorage(storageOptions);
    },
    []
  );

  const [storage, setStorage] = React.useState(() =>
    createStorage(storageOptions as ReactNativeStorageOptions)
  );

  useDeepCompareEffect(() => {
    setStorage(createStorage(storageOptions as ReactNativeStorageOptions));
  }, [setStorage, storageOptions]);

  const sessionStorageKey = React.useMemo(
    () => `${storageOptions.rootStorageKey}:session`,
    [storageOptions]
  );

  const walletServiceStorageKey = React.useMemo(
    () => `${storageOptions.rootStorageKey}:walletService`,
    [storageOptions]
  );

  const connectToWalletService = React.useCallback(
    async (walletService: WalletService, uri?: string): Promise<void> => {
      //NOTE: Implemented deep linking inside connectToWalletService callback
      if (Platform.OS === "android") {
        // const canOpenURL = await Linking.canOpenURL(uri);
        // if (!canOpenURL) {
        //   // Redirect the user to download a wallet.
        //   Linking.openURL("https://walletconnect.org/wallets");
        //   throw new Error("No wallets found.");
        // }
        await Linking.openURL(uri);
      }

      if (typeof uri !== "string" || !uri.length) {
        return Promise.reject(new Error("Invalid uri."));
      }
      const maybeRedirectUrl =
        typeof redirectUrl === "string"
          ? `&redirectUrl=${encodeURIComponent(redirectUrl)}`
          : "";
      const connectionUrl = `${formatWalletServiceUrl(
        walletService
      )}/wc?uri=${encodeURIComponent(uri)}${maybeRedirectUrl}`;

      if (await Linking.canOpenURL(connectionUrl)) {
        return (
          (await Promise.all<any>([
            storage.setItem(walletServiceStorageKey, walletService),
            Linking.openURL(connectionUrl),
          ])) && undefined
        );
      }
      return Promise.reject(new Error("Unable to open url."));
    },
    [walletServiceStorageKey, storage, redirectUrl, state]
  );

  const [connector, setConnector] = React.useState<WalletConnect | undefined>();

  const createConnector = React.useCallback(
    async function shouldCreateConnector(
      params: WalletConnectContextValue
    ): Promise<WalletConnect> {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { storageOptions: _storageOptions, ...extras } = params;
      const [
        maybeExistingSession,
        maybeExistingWalletService,
      ] = await Promise.all([
        await storage.getItem(sessionStorageKey),
        await storage.getItem(walletServiceStorageKey),
      ]);

      const isResumable = false;
      (!!maybeExistingSession &&
        // // Android does not inherently "know" the provider.
        // // (This information is obscured by the BottomSheet.)
        Platform.OS === "android") ||
        !!maybeExistingWalletService;

      if (!isResumable) {
        await Promise.all([
          storage.removeItem(sessionStorageKey),
          storage.removeItem(walletServiceStorageKey),
        ]);
      }

      const nextConnector = new WalletConnect({
        session: isResumable
          ? (maybeExistingSession as IWalletConnectSession)
          : undefined,
        qrcodeModal,
        ...extras,
      });

      const maybeThrowError = (error?: unknown) => {
        if (error) {
          throw error;
        }
      };

      nextConnector.on(ConnectorEvents.CONNECT, async (error: unknown) => {
        maybeThrowError(error);
        await storage.setItem(sessionStorageKey, nextConnector.session);
      });

      nextConnector.on(
        ConnectorEvents.CALL_REQUEST_SENT,
        async (error: unknown) => {
          maybeThrowError(error);
          if (Platform.OS === "android") {
            const { peerMeta } = nextConnector;
            if (!!peerMeta && typeof peerMeta === "object") {
              const [maybeShortName] = `${peerMeta.name || ""}`
                .toLowerCase()
                .split(/\s+/);
              if (
                typeof maybeShortName === "string" &&
                !!maybeShortName.length
              ) {
                const { walletServices } = parentContext;
                const [...maybeMatchingServices] = (
                  walletServices || []
                ).filter(({ metadata: { shortName } }) => {
                  return `${shortName}`.toLowerCase() === maybeShortName;
                });
                if (maybeMatchingServices.length === 1) {
                  const [detectedWalletService] = maybeMatchingServices;
                  const url = formatWalletServiceUrl(detectedWalletService);
                  if (await Linking.canOpenURL(url)) {
                    return Linking.openURL(url);
                  }
                }
              }
            }
            // On Android, fall back to asking the user to pick the correct application.
            Linking.openURL("wc:");
          } else if (Platform.OS !== "web") {
            const walletService:
              | WalletService
              | undefined = await storage.getItem(walletServiceStorageKey);

            if (!walletService) {
              return maybeThrowError(
                new Error("Cached WalletService not found.")
              );
            }

            const url = formatWalletServiceUrl(walletService);
            return (await Linking.canOpenURL(url)) && Linking.openURL(url);
          }
        }
      );

      nextConnector.on(
        ConnectorEvents.SESSION_UPDATE,
        async (error: unknown) => {
          maybeThrowError(error);
          await storage.setItem(sessionStorageKey, nextConnector.session);
        }
      );

      nextConnector.on(ConnectorEvents.DISCONNECT, async (error: unknown) => {
        await Promise.all([
          storage.setItem(sessionStorageKey, undefined),
          storage.setItem(walletServiceStorageKey, undefined),
        ]);
        setConnector(await shouldCreateConnector(params)); /* wc_repeat */
        maybeThrowError(error);
      });

      return nextConnector;
    },
    [
      sessionStorageKey,
      walletServiceStorageKey,
      storage,
      qrcodeModal,
      setConnector,
      parentContext,
    ]
  );

  useDeepCompareEffect(() => {
    (async () => {
      setConnector(await createConnector(intermediateValue));
    })();
  }, [setConnector, createConnector, intermediateValue]);

  const onDismiss = React.useCallback(() => {
    close();
    (async () => {
      setConnector(await createConnector(intermediateValue));
    })();
  }, [close, setConnector, createConnector, intermediateValue]);

  const modalProps = React.useMemo(
    (): RenderQrcodeModalProps => ({
      connectToWalletService,
      visible: state.visible,
      walletServices,
      uri: state.uri,
      onDismiss,
    }),
    [
      state.visible,
      connectToWalletService,
      walletServices,
      state.uri,
      onDismiss,
    ]
  );

  const value = React.useMemo((): WalletConnectContextValue => {
    if (connector) {
      // Reset the connector.
      return {
        ...intermediateValue,
        walletServices,
        connectToWalletService,
        connector: Object.assign(Object.create(connector), {
          ...connector,
          connect: async (opts?: ICreateSessionOptions) => {
            if (!walletServices.length) {
              throw new Error("Mobile registry not yet ready.");
            } else if (walletServicesError) {
              throw walletServicesError;
            }
            const nextConnector = await createConnector(intermediateValue);
            setConnector(nextConnector);
            const session = await nextConnector.connect(opts);
            return { connector: nextConnector, session };
          },
        }),
      };
    }
    return {
      ...intermediateValue,
      walletServices,
      connectToWalletService,
      connector,
    };
  }, [
    intermediateValue,
    connectToWalletService,
    connector,
    state,
    setConnector,
    walletServices,
    walletServicesError,
  ]);

  return (
    <WalletConnectContext.Provider value={value}>
      {!!children && children}
      {renderQrcodeModal(modalProps)}
    </WalletConnectContext.Provider>
  );
}
