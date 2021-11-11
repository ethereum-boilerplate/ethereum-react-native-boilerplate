import React from "react";
import { useMoralis } from "react-moralis";
import useERC20Balance from "./hooks/useERC20balance";
import {
  StyleSheet,
  View,
  FlatList,
  StatusBar,
  SafeAreaView,
  ScrollView,
} from "react-native";
import { Divider } from "react-native-paper";
import NativeBalance from "./NativeBalance";
import ERC20Balance from "./ERC20Balance";
import { Text } from "@ui-kitten/components";

export default function Assets() {
  const { Moralis } = useMoralis();
  // const nativeName = useMemo(() => getNativeByChain(options?.chain || chainId), [options, chainId]);

  return (
    <SafeAreaView style={[StyleSheet.absoluteFill, styles.container]}>
      <ScrollView>
        <View style={styles.viewContainer}>
          <Text style={styles.chainText} category="c2">
            Assets
          </Text>
          <NativeBalance chain="0x1" />
          <ERC20Balance></ERC20Balance>
          <Text style={styles.chainText} category="c2">
            Binance Smart Chain
          </Text>
          <NativeBalance chain="0x38" />
          <ERC20Balance chain="0x38"></ERC20Balance>
          <Text style={styles.chainText} category="c2">
            Polygon Chain
          </Text>
          <NativeBalance chain="0x89" />
          <ERC20Balance chain="0x89"></ERC20Balance>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    marginTop: StatusBar.currentHeight || 0,
  },
  chainText: {
    fontSize: 15,
    paddingVertical: 20,
  },
  viewContainer: {
    paddingHorizontal: 20,
    flex: 10,
  },
});
