# `ethereum-react-native-boilerplate`

> React Native components and hooks for fast building dApps without running own backend

This project is using:

- [create-react-native-dapp](cawfree/create-react-native-dapp) to bootstrap the project.
- [WalletConnect v1 react-native integration](https://docs.walletconnect.com/1.0/quick-start/dapps/react-native) for authenthication (we use a slightly modiefied version, located in `./src/WalletConnect` to allow to modify the `enable` function of Moralis).
- [react-moralis](https://github.com/MoralisWeb3/react-moralis) for react hooks

There are many components in this boilerplate that do not require an active web3 provider, they use Moralis Web3 API. Moralis supports the most popular blockchains and their test networks. You can find a list of all available networks in [Moralis Supported Chains](https://docs.moralis.io/moralis-server/web3-sdk/intro#supported-chains)

Please check the [official documentation of Moralis](https://docs.moralis.io/#user) for all the functionalities of Moralis.

Check the corresponding docs for additional information and help.

|                                                        App Home                                                        |                                              WalletConnect Authentication                                              |
| :--------------------------------------------------------------------------------------------------------------------: | :--------------------------------------------------------------------------------------------------------------------: |
| ![Github Demo 1](https://user-images.githubusercontent.com/9363303/141595048-c3127959-92e8-4c8b-b184-fc36091b384c.gif) | ![Github Demo 2](https://user-images.githubusercontent.com/9363303/141595778-ca546ade-ae9d-4ef7-ace5-fca2638be089.gif) |

# ⭐️ `Star us`

If this boilerplate helps you build Ethereum mobile dapps faster - please star this project, every star makes us very happy!

# 🚀 Quick Start

📄 Clone or fork `ethereum-react-native-boilerplate`:

```sh
git clone https://github.com/ethereum-boilerplate/ethereum-react-native-boilerplate.git
```

💿 Install the expo CLI globally:

```sh
npm i -g expo-cli
```

💿 Install all dependencies:

```sh
cd ethereum-react-native-boilerplate
yarn install
```

🚴‍♂️ Run your App:

- Web: `yarn web`
- IOS: `yarn ios`
- Android: `yarn android`

# 🧭 Table of contents

- [`ethereum-react-native-boilerplate`](#ethereum-react-native-boilerplate)
- [⭐️ `Star us`](#️-star-us)
- [🚀 Quick Start](#-quick-start)
- [🧭 Table of contents](#-table-of-contents)
- [🏗 Ethereum Components](#-ethereum-components)
    - [`<CryptoAuth />`](#cryptoauth-)
    - [`<NativeBalance />`](#nativebalance-)
    - [`<ERC20Balance />`](#erc20balance-)
    - [`<Assets />`](#assets-)
    - [`<RecentTransactions />`](#recenttransactions-)
    - [`<TransactionDetails />`](#transactiondetails-)
    - [`<Header />`](#header-)
- [🧰 Ethereum Hooks](#-ethereum-hooks)
    - [`useTokenPrice()`](#usetokenprice)
    - [`useERC20balance()`](#useerc20balance)
    - [`useERC20Transfers()`](#useerc20transfers)

- [🧰 Ethereum Hooks](#-ethereum-hooks)
  - [`useTokenPrice()`](#usetokenPrice)
  - [`useERC20Balance()`](#useerc20balance)
  - [`useERC20Transfers()`](#useerc20transfers)

# 🏗 Ethereum Components

🛠 The ready for use react-native-components are located in `frontend/Components`. They are designed to be used anywhere in your dApp.

### `<CryptoAuth />`

📒 `<CryptoAuth />` : Easy web3 authentication via WalletConnect.

### `<NativeBalance />`

**Options**:

- chain: chain to fetch data from.

### `<ERC20Balance />`

📨 `<ERC20Balance />` : Displays all ERC20 Balances with Price.
**Options**:

- chain: chain to fetch data from.

### `<Assets />`

💰 `<Assets />` : Screen to display all Chain ERC20 and NAtive Assets with Prices

### `<RecentTransactions />`

💰 `<RecentTransactions />` : Screen to display all Chain ERC20 Transactions

### `<TransactionDetails />`

`<TransactionDetails />` : Modal to display all ERC20 Transaction related content

### `<Header />`

Displays The user address that is copyable

# 🧰 Ethereum Hooks

### `useTokenPrice()`

### `useERC20balance()`

### `useERC20Transfers()`
