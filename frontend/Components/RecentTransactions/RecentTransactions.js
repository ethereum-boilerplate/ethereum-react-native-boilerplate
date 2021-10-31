import React, { useEffect, useState } from "react";
import { useMoralis } from "react-moralis";
import {
  StyleSheet,
  SafeAreaView,
  Text,
  View,
  FlatList,
  StatusBar,
  Image,
} from "react-native";
import { getEllipsisTxt } from "../../utils/formatters";
import useERC20Transfers from "./hooks/useERC20Transfers";
import { faWallet } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { List, Divider } from "react-native-paper";

const Item = ({ address, Moralis, value, logo }) => (
  <View style={styles.itemContainer}>
    <View style={styles.itemView}>
      <View style={{ flex: 1, justifyContent: "center" }}>
        <FontAwesomeIcon icon={faWallet} color="grey" size={20} />
      </View>
      <View style={{ flex: 3, justifyContent: "center" }}>
        <Text style={styles.text}>{getEllipsisTxt(address, 7)}</Text>
      </View>

      <View
        style={{ flex: 1, justifyContent: "center", alignItems: "flex-end" }}>
        <Text style={styles.text}>{Moralis.Units.FromWei(value, 18)}</Text>
      </View>
    </View>
    <Divider />
  </View>
);

function RecentTransactions() {
  const { ERC20Transfers } = useERC20Transfers();
  const { Moralis } = useMoralis();
  console.log(ERC20Transfers ? ERC20Transfers[0] : "");

  const renderItem = ({ item }) => {
    return <Item address={item.address} Moralis={Moralis} value={item.value} />;
  };

  return (
    <SafeAreaView style={styles.flex1}>
      <View style={styles.container}>
        <Text style={styles.subheader}>Confimed Transactions</Text>

        <FlatList
          data={ERC20Transfers}
          renderItem={renderItem}
          keyExtractor={(item, index) => index.toString()}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // alignItems: "center",
    justifyContent: "center",
    // backgroundColor: "red",
    paddingTop: 20,
    marginTop: 20,
    paddingHorizontal: 10,

    marginTop: StatusBar.currentHeight || 0,

    // color: "red",
  },
  blue: {
    backgroundColor: "blue",
  },
  item: {
    backgroundColor: "green",
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  itemContainer: {
    flex: 1,
    flexDirection: "column",
    backgroundColor: "white",
  },
  itemView: {
    backgroundColor: "white",
    padding: 20,
    // marginVertical: 8,
    marginHorizontal: 2,
    flex: 1,
    flexDirection: "row",
  },
  subheader: {
    fontSize: 15,
    fontWeight: "500",
    color: "grey",
    paddingBottom: 10,
  },
  activityIndicator: {
    alignItems: "center",
    height: 80,
  },
  title: {
    fontSize: 10,
    color: "black",
  },
  text: {
    fontSize: 15,
    color: "black",
    fontWeight: "500",
  },
  flex1: {
    flex: 1,
  },
});

export default RecentTransactions;
