Cloned from: https://github.com/WalletConnect/walletconnect-monorepo/tree/v1.0/packages/helpers/react-native-dapp/src

With the adjustment of changing the return value of the connector in the WalletConnectProvider.
This is to get access to the `nextConnector`, which is needed in the custom `enable` function.

OLD:
```js
connector: Object.assign(Object.create(connector), {
  ...connector,
  connect: async (opts?: ICreateSessionOptions) => {
    //...
    return nextConnector.connect(opts)
  },
}),

```

New:
```js
connector: Object.assign(Object.create(connector), {
  ...connector,
  connect: async (opts?: ICreateSessionOptions) => {
    // ...
    const session = await nextConnector.connect(opts)
    return {connector: nextConnector, session};
  },
}),
```
