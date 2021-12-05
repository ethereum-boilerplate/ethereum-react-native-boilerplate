import * as React from "react";
import {
  Animated,
  FlatList,
  Linking,
  Platform,
  StyleSheet,
  TouchableOpacity,
  useWindowDimensions,
  View,
  Text,
  Modal,
  Pressable,
} from "react-native";

import { RenderQrcodeModalProps, WalletService } from "../types";

import Qrcode from "./Qrcode";
import WalletConnectLogo from "./WalletConnectLogo";
import WalletServiceRow from "./WalletServiceRow";

const styles = StyleSheet.create({
  absolute: { position: "absolute" },
  black: { backgroundColor: "black" },
  white: { backgroundColor: "white" },

  center: { alignItems: "center", justifyContent: "center" },
  border: { borderColor: "black", borderWidth: 10 },
  flex: { flex: 1 },
  fullWidth: { width: "100%" },
  halfHeight: { height: "50%" },
  noOverflow: { overflow: "hidden" },
  row: { alignItems: "center", flexDirection: "row" },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    margin: 10,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 15,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  buttonClose: {
    backgroundColor: "#2196F3",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },
});

const useNativeDriver = Platform.OS !== "web";

export default function QrcodeModal({
  visible,
  walletServices,
  connectToWalletService,
  uri,
  onDismiss,
  division,
}: RenderQrcodeModalProps & { readonly division: number }): JSX.Element {
  const shouldConnectToWalletService = React.useCallback(
    (walletService: WalletService) => {
      connectToWalletService(walletService, uri)
    },
    [connectToWalletService, uri]
  );
  const { width, height } = useWindowDimensions();
  const { opacity, logo, icons } = React.useMemo(
    () => ({
      opacity: new Animated.Value(0),
      logo: new Animated.Value(0),
      icons: new Animated.Value(0),
    }),
    []
  );
  const walletServiceRows = React.useMemo((): readonly (readonly WalletService[])[] => {
    return [...Array(Math.ceil(walletServices.length / division))].map((_, i) =>
      walletServices.slice(i * division, i * division + division)
    );
  }, [walletServices, division]);

  const modalHeight = height * 0.4;
  const modalWidth = modalHeight * 0.9;
  const modalListHeight = height * 0.3;
  const modalListWidth = modalHeight * 0.8;

  const shouldAnimate = React.useCallback(
    (totalDuration: number, direction: boolean) => {
      const sequence = [
        Animated.timing(opacity, {
          toValue: direction ? 1 : 0,
          duration: totalDuration * 0.5,
          useNativeDriver,
        }),
        Animated.delay(direction ? 0 : totalDuration * 0.4),
        Animated.parallel([
          Animated.sequence([
            Animated.delay(totalDuration * (direction ? 0.2 : 0)),
            Animated.timing(icons, {
              toValue: direction ? 1 : 0,
              duration: totalDuration * (direction ? 0.3 : 0.5),
              useNativeDriver,
            }),
          ]),
          Animated.timing(logo, {
            toValue: direction ? 1 : 0,
            duration: totalDuration * 0.5,
            useNativeDriver,
          }),
        ]),
      ];
      if (!direction) {
        sequence.reverse();
      }
      Animated.sequence(sequence).start();
    },
    [opacity, logo, icons, division]
  );

  React.useEffect(() => {
    shouldAnimate(visible ? 600 : 600, visible);
  }, [shouldAnimate, visible]);

  const onPressLogo = React.useCallback(async () => {
    const url = "https://walletconnect.org/";
    return (await Linking.canOpenURL(url)) && Linking.openURL(url);
  }, []);

  const keyExtractor = React.useCallback(
    (walletServiceRow: readonly WalletService[]): string => {
      return `k${walletServiceRows.indexOf(walletServiceRow)}`;
    },
    [walletServiceRows]
  );

  const renderItem = React.useCallback(
    ({ item, index }): JSX.Element => {
      return (
        <WalletServiceRow
          key={`k${index}`}
          style={{ opacity: icons }}
          division={division}
          walletServices={item}
          width={modalListWidth}
          height={modalListHeight * 0.25}
          connectToWalletService={shouldConnectToWalletService}
        />
      );
    },
    [modalWidth, modalHeight, division, icons, shouldConnectToWalletService]
  );

  const shouldRenderQrcode = Platform.OS === "web";

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      // presentationStyle="formSheet"
      //onRequestClose={() => onDismiss()}
    >
      <View style={[styles.flex, styles.center]}>
        <View
          style={[
            styles.modalView,
            styles.noOverflow,
            { width: modalWidth, height: modalHeight },
          ]}
          pointerEvents={visible ? "box-none" : "none"}>
          {/* <View style={[styles.modalView, styles.noOverflow]}> */}
          {/* <Text style={styles.modalText}>Hello World!</Text> */}
          <Animated.View
            style={
              [
                // styles.absolute,
                // styles.noOverflow,
                // {
                //   width,
                //   height,
                //   opacity,
                // },
                // styles.border,
                // styles.halfHeight,
                // styles.center,
                // styles.flex,
              ]
            }
            pointerEvents={visible ? "box-none" : "none"}>
            {/* backdrop */}

            <View
              style={[styles.center]}
              pointerEvents={visible ? "box-none" : "none"}>
              <Animated.View
                style={{ width: modalListWidth, height: modalHeight * 0.9 }}>
                {shouldRenderQrcode ? (
                  <Animated.View
                    style={[
                      StyleSheet.absoluteFill,
                      styles.center,
                      { opacity: icons, transform: [{ scale: icons }] },
                    ]}>
                    <Qrcode uri={uri} size={modalListHeight * 0.8} />
                  </Animated.View>
                ) : (
                  <FlatList
                    scrollEnabled={visible}
                    showsVerticalScrollIndicator={visible}
                    keyExtractor={keyExtractor}
                    style={styles.flex}
                    data={walletServiceRows}
                    renderItem={renderItem}
                  />
                )}
                <TouchableOpacity onPress={onPressLogo}>
                  <WalletConnectLogo width={modalListWidth} />
                </TouchableOpacity>
              </Animated.View>

              {/* logo */}
              {/* <View style={[]} pointerEvents="box-none">
                <Animated.View
                  pointerEvents={visible ? "box-none" : "none"}
                  style={{
                    width: modalWidth,
                    transform: [
                      {
                        translateY: Animated.multiply(
                          modalHeight * (shouldRenderQrcode ? 0.5 : 0.6),
                          logo
                        ),
                      },
                      { scale: Animated.add(1, Animated.multiply(logo, -0.2)) },
                    ],
                  }}>
                  <TouchableOpacity onPress={onPressLogo}>
                    <WalletConnectLogo width={modalWidth} />
                  </TouchableOpacity>
                </Animated.View>
              </View> */}
            </View>
          </Animated.View>
        </View>
        <Pressable
          style={[styles.button, styles.buttonClose]}
          onPress={() => onDismiss()}>
          <Text style={styles.textStyle}>Close </Text>
        </Pressable>
      </View>
    </Modal>
  );
}
