# `ethereum-react-native-boilerplate`

> React Native components and hooks for fast building dApps without running own backend

This project is using:

- [create-react-native-dapp](https://github.com/cawfree/create-react-native-dapp) to bootstrap the project.
- [WalletConnect v1 react-native integration](https://docs.walletconnect.com/1.0/quick-start/dapps/react-native) for authenthication (we use a slightly modiefied version, located in `./src/WalletConnect` to allow to modify the `enable` function of Moralis).
- [react-moralis](https://github.com/MoralisWeb3/react-moralis) for react hooks

There are many components in this boilerplate that do not require an active web3 provider, they use Moralis Web3 API. Moralis supports the most popular blockchains and their test networks. You can find a list of all available networks in [Moralis Supported Chains](https://docs.moralis.io/moralis-server/web3-sdk/intro#supported-chains)

Please check the [official documentation of Moralis](https://docs.moralis.io/#user) for all the functionalities of Moralis.

Check the corresponding docs for additional information and help.

|                                                        App Home                                                        |                                              WalletConnect Authentication                                              |
| :--------------------------------------------------------------------------------------------------------------------: | :--------------------------------------------------------------------------------------------------------------------: |
| ![Github Demo 1](https://user-images.githubusercontent.com/9363303/141595048-c3127959-92e8-4c8b-b184-fc36091b384c.gif) | ![Github Demo 2](https://user-images.githubusercontent.com/9363303/141595778-ca546ade-ae9d-4ef7-ace5-fca2638be089.gif) |

|                                                        Transactions                                                        |                                              NFT Screen                                             |
| :--------------------------------------------------------------------------------------------------------------------: | :--------------------------------------------------------------------------------------------------------------------: |
| ![NFT screenrecording ](https://user-images.githubusercontent.com/9363303/143194753-7fefc03e-4bb2-49a9-b1c2-b7b11e55ca5e.GIF) | ![IMG_4512](https://user-images.githubusercontent.com/9363303/143195894-b8cf9bbc-7518-4ea6-852b-7ed5e97a51cb.GIF) |





# ⭐️ `Star us`

If this boilerplate helps you build Ethereum mobile dapps faster - please star this project, every star makes us very happy!

# 🤝 `Need help?`

If you need help with setting up the boilerplate or have other questions - don't hesitate to write in our community forum and we will check asap. [Forum link](https://forum.moralis.io/t/ethereum-react-native-boilerplate-questions/4511). The best thing about this boilerplate is the super active community ready to help at any time! We help each other.

# 🚀 Quick Start

📄 Clone or fork `ethereum-react-native-boilerplate`:

```sh
git clone https://github.com/ethereum-boilerplate/ethereum-react-native-boilerplate.git
```

💿 Install the expo CLI globally:

```sh
npm i -g expo-cli
```

✏ Rename `.env.example` to `.env` in the main folder and provide your `appId` and `serverUrl` from Moralis ([How to start Moralis Server](https://docs.moralis.io/moralis-server/getting-started/create-a-moralis-server))
Example:

```jsx
REACT_APP_MORALIS_APPLICATION_ID = xxxxxxxxxxxx
REACT_APP_MORALIS_SERVER_URL = https://xxxxxx.grandmoralis.com:2053/server
```

💿 Install all dependencies:

```sh
cd ethereum-react-native-boilerplate
yarn install
```

🚴‍♂️ Run your App:

- IOS: `yarn ios` for emulator *Make sure you have Xcode or atleast Xcode command line tools installed*
    -  For physical IOS Device: Open the `moraliscreatereactnativedapp.xcworkspace` from `ios` folder in Xcode. Run the App by choosing your connected physical device.  
- Android:
    - Command `yarn start` 
    - Open `android` folder from source code in Android Studio. Click "Run app" button to open either emulator or physical device. To see if devices are available, run command `adb devices` in your terminal. 

# 🧭 Table of contents

- [`ethereum-react-native-boilerplate`](#ethereum-react-native-boilerplate)
- [⭐️ `Star us`](#️-star-us)
- [🤝 `Need help?`](#-need-help)
- [🚀 Quick Start](#-quick-start)
- [🧭 Table of contents](#-table-of-contents)
- [🏗 Ethereum Components](#-ethereum-components)
    - [`<CryptoAuth />`](#cryptoauth-)
    - [`<NativeBalance />`](#nativebalance-)
    - [`<ERC20Balance />`](#erc20balance-)
    - [`<Assets />`](#assets-)
    - [`<RecentTransactions />`](#recenttransactions-)
    - [`<TransactionDetails />`](#transactiondetails-)
    - [`<Address />`](#address-)
- [🧰 Ethereum Hooks](#-ethereum-hooks)
    - [`useERC20balance()`](#useerc20balance)
    - [`useERC20Transfers()`](#useerc20transfers)
    - [`useNativeTransactions()`](#usenativetransactions)
    - [`useTokenPrice()`](#usetokenprice)
    - [`useNFTTransfers()`](#usenfttransfers)
    - [`useNFTBalance()`](#usenftbalance)

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

### `<Address />`

Displays The user address that is copyable

# 🧰 Ethereum Hooks

### `useERC20balance()`

💰 Gets all token balances of a current user or specified address.

**Options**:

- `chain` (optional): The blockchain to get data from. Valid values are listed on the intro page in the Transactions and Balances section. Default value: current chain.
- `address` (optional): A user address (i.e. 0x1a2b3x...). If specified, the user attached to the query is ignored and the address will be used instead.
- `to_block` (optional): The block number on which the balances should be checked

**Returns** (Object) : number of tokens and the array of token objects

```jsx
const { fetchERC20Balance, assets } = useERC20Balance({ chain: "eth" });
```

### `useERC20Transfers()`

🧾 Gets ERC20 token transfers of a current user or specified address.

**Options**:

- `chain` (optional): The blockchain to get data from. Valid values are listed on the intro page in the Transactions and Balances section. Default value: current chain.
- `address` (optional): A user address (i.e. 0x1a2b3x...). If specified, the user attached to the query is ignored and the address will be used instead.
- `from_date` (optional): The date from where to get the transactions (any format that is accepted by momentjs). Provide the param 'from_block' or 'from_date' If 'from_date' and 'from_block' are provided, 'from_block' will be used.
- `to_date` (optional): Get the transactions to this date (any format that is accepted by momentjs). Provide the param 'to_block' or 'to_date' If 'to_date' and 'to_block' are provided, 'to_block' will be used.
- `from_block` (optional): The minimum block number from where to get the transactions Provide the param 'from_block' or 'from_date' If 'from_date' and 'from_block' are provided, 'from_block' will be used.
- `to_block` (optional): The maximum block number from where to get the transactions. Provide the param 'to_block' or 'to_date' If 'to_date' and 'to_block' are provided, 'to_block' will be used.
- `offset` (optional): Offset.
- `limit` (optional): Limit.

**Returns** (Array) : ERC20 token transfers

### `useNativeTransactions()`

🧾 Gets the transactions from the current user or specified address. Returns an object with the number of transactions and the array of native transactions

**Options**:

- `chain` (optional): The blockchain to get data from. Valid values are listed on the intro page in the Transactions and Balances section. Default value: current chain.
- `address` (optional): A user address (i.e. 0x1a2b3x...). If specified, the user attached to the query is ignored and the address will be used instead.
- `from_date` (optional): The date from where to get the transactions (any format that is accepted by momentjs). Provide the param 'from_block' or 'from_date' If 'from_date' and 'from_block' are provided, 'from_block' will be used.
- `to_date` (optional): Get the transactions to this date (any format that is accepted by momentjs). Provide the param 'to_block' or 'to_date' If 'to_date' and 'to_block' are provided, 'to_block' will be used.
- `from_block` (optional): The minimum block number from where to get the transactions Provide the param 'from_block' or 'from_date' If 'from_date' and 'from_block' are provided, 'from_block' will be used.
- `to_block` (optional): The maximum block number from where to get the transactions. Provide the param 'to_block' or 'to_date' If 'to_date' and 'to_block' are provided, 'to_block' will be used.
- `offset` (optional): Offset.
- `limit` (optional): Limit.

**Returns** (Array) : native transactions

### `useTokenPrice()`

### `useNFTTransfers()`

### `useNFTBalance()`
