import React from "react";
import { useMoralis } from "react-moralis";
import useERC20Balance from "./hooks/useERC20balance";
import {
  StyleSheet,
  View,
  FlatList,
  StatusBar,
  SafeAreaView,
  Text,
} from "react-native";
import { Divider } from "react-native-paper";
import NativeBalance from "./NativeBalance";
import ERC20Balance from "./ERC20Balance";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    marginTop: StatusBar.currentHeight || 0,
  },
});

export default function Assets() {
  const { Moralis } = useMoralis();

  return (
    <SafeAreaView style={[StyleSheet.absoluteFill, styles.container]}>
      <View style={{ flex: 1 }}>
        <NativeBalance />
      </View>
      <View style={{ flex: 10 }}>
        <ERC20Balance></ERC20Balance>
      </View>
    </SafeAreaView>
  );
}
