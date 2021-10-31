import React, { useEffect } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import {
  useMoralis,
  useMoralisWeb3Api,
  useMoralisWeb3ApiCall,
} from "react-moralis";
import { useWalletConnect } from "./WalletConnect";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import SplashScreen from "./Components/SplashScreen";
import CryptoAuth from "./Components/CryptoAuth";
import RecentTransactions from "./Components/RecentTransactions/RecentTransactions";
import Assets from "./Components/Assets/Assets";
import Transfer from "./Components/Transfer/Transfer";
import Profile from "./Components/Profile/Profile";

import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import {
  faCreditCard,
  faCoins,
  faUser,
  faPaperPlane,
} from "@fortawesome/free-solid-svg-icons";

import Moralis from "moralis/types";

const styles = StyleSheet.create({
  center: { alignItems: "center", justifyContent: "center", flex: 1 },
  topCenter: { alignItems: "center" },
  blue: { backgroundColor: "blue" },
  red: { backgroundColor: "red" },
  margin: { marginBottom: 20 },
  marginLarge: { marginBottom: 35 },
  weightHeavey: { fontWeight: "700", fontSize: 20 },
});

function Web3ApiExample(): JSX.Element {
  const { Moralis, user } = useMoralis();
  const chainNAme = "eth";
  const {
    account: { getNativeBalance },
  } = useMoralisWeb3Api();

  //defaults to eth chain and user logged in address, if you want custom, you can pass in the options argument
  const { data, isFetching, error } = useMoralisWeb3ApiCall(getNativeBalance);

  if (isFetching) {
    return (
      <View style={styles.marginLarge}>
        <Text>Fetching token-balances...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.marginLarge}>
        <Text>Error:</Text>
        <Text>{JSON.stringify(error)}</Text>
      </View>
    );
  }

  return (
    <View style={styles.marginLarge}>
      <Text style={styles.weightHeavey}>Native balance</Text>

      <Text style={styles.weightHeavey}>
        {/* @ts-ignore */}
        {data ? data.balance / ("1e" + "18") : "none"}
      </Text>
    </View>
  );
}

function Home(): JSX.Element {
  return (
    <Tab.Navigator
      shifting={false}
      // activeColor="#f0edf6"
      // inactiveColor="#3e2465"
      barStyle={{ backgroundColor: "white" }}>
      <Tab.Screen
        name="Recent Tx"
        options={{
          tabBarLabel: "Transactions",
          tabBarIcon: ({ color }) => (
            <FontAwesomeIcon icon={faCreditCard} color={color} size={20} />
          ),
        }}
        component={RecentTransactions}
      />
      <Tab.Screen
        name="Transfer"
        options={{
          tabBarLabel: "Transfer",
          tabBarIcon: ({ color }) => (
            <FontAwesomeIcon icon={faPaperPlane} color={color} size={20} />
          ),
        }}
        component={Transfer}
      />
      <Tab.Screen
        name="Assets"
        options={{
          tabBarLabel: "Assets",
          tabBarIcon: ({ color }) => (
            <FontAwesomeIcon icon={faCoins} color={color} size={20} />
          ),
        }}
        component={Assets}
      />
      <Tab.Screen
        name="Profile"
        options={{
          tabBarLabel: "Profile",
          tabBarIcon: ({ color }) => (
            <FontAwesomeIcon icon={faUser} color={color} size={20} />
          ),
        }}
        component={Profile}
      />
    </Tab.Navigator>
  );
}

const Tab = createMaterialBottomTabNavigator();
const Stack = createStackNavigator();

function App(): JSX.Element {
  const connector = useWalletConnect();
  const {
    authenticate,
    authError,
    isAuthenticating,
    isAuthenticated,
    logout,
    Moralis,
  } = useMoralis();

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="SplashScreen">
        {/* SplashScreen which will come once for 5 Seconds */}
        <Stack.Screen
          name="SplashScreen"
          component={SplashScreen}
          // Hiding header for Splash Screen
          options={{ headerShown: false }}
        />
        {/* Auth Navigator: Include Login and Signup */}
        <Stack.Screen
          name="Auth"
          component={CryptoAuth}
          options={{ headerShown: false }}
        />
        {/* Navigation Drawer as a landing page */}
        <Stack.Screen
          name="DrawerNavigationRoutes"
          component={Home}
          // Hiding header for Navigation Drawer
          options={{ headerShown: true, title: "Assets" }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
