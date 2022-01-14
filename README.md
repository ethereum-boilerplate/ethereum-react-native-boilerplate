# ethereum-react-native-cli-boilerplate
💿 Install all dependencies:

```sh
cd ethereum-react-native-cli-boilerplate
yarn install

cd ios
pod install

cd ..
```

🚴‍♂️ Run your App:

IMPORTANT: 
- To run the app and be able to actually login do the following:
    - Make sure to have Xcode installed on your machine if you wish to run it in iOS development and Android Studio if you want it in Android.
    - Connect a physical phone device. Open termilan/cmd and run ```adb devices``` and see if your android device id is listed.
    - Install your preferred wallet on your device: (Metamask, Trust Wallet etc..)

- IOS: 
    - Command ```react-native run-ios``` or ```npx react-native run-ios``` for M1 users
- Android:
    - Command ```react-native run-android``` or ```npx react-native run-android``` for M1 users

What's New:
- React Native Debugger. Debugging your dapp in a browser is straightforward with React Native Debugger. Simply open the simulator on iOS and press ```cmd + d```; for the Android emulator, ```press cmd + m``` and pick Debug from the React Native Debug menu. If you're using a physical device, simply shake it until the debugger menu appears.
