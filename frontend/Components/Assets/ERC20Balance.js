import React from "react";
import { useMoralis } from "react-moralis";
import {
  FlatList,
  View,
  Text,
  Image,
  StyleSheet,
  Pressable,
} from "react-native";
// import { Flex  } from "../../uikit/Flex/Flex";
import { getEllipsisTxt } from "../../utils/formatters";
import useERC20Balance from "./hooks/useERC20balance";
import { List, Card, Divider } from "react-native-paper";

const Item = ({ name, logo, balance, symbol }) => (
  <View style={styles.itemContainer}>
    <View style={styles.itemView}>
      <View style={{ flex: 1 }}>
        {logo ? (
          <Image source={{ uri: logo }} style={styles.logo} />
        ) : (
          <Image
            source={{ uri: "https://etherscan.io/images/main/empty-token.png" }}
            style={styles.logo}
          />
        )}
      </View>
      <View style={{ flex: 2, justifyContent: "center" }}>
        <Text style={styles.name}>{name}</Text>
      </View>
      <View
        style={{ flex: 2, justifyContent: "center", alignItems: "flex-end" }}>
        <Text style={styles.balance}>
          {balance} {symbol}
        </Text>
      </View>
    </View>
    <Divider />
  </View>
);

function ERC20Balance(props) {
  const { assets } = useERC20Balance(props);
  const { Moralis } = useMoralis();
  console.log(assets, "assets");

  const renderItem = ({ item }) => {
    return (
      <Pressable onPress={() => (props.setToken ? props.setToken(item) : null)}>
        <Item
          name={item.name}
          logo={item.logo}
          balance={parseFloat(
            Moralis.Units.FromWei(item.balance, item.decimals).toFixed(6)
          )}
          symbol={item.symbol}
        />
      </Pressable>
    );
  };

  return (
    <FlatList
      data={assets}
      renderItem={renderItem}
      keyExtractor={(item, index) => index.toString()}
    />
  );
}

const styles = StyleSheet.create({
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
  balance: {
    fontSize: 18,
    color: "black",
    fontWeight: "400",
  },
  name: {
    fontSize: 15,
    color: "black",
    fontWeight: "500",
  },
  logo: {
    height: 50,
    width: 50,
  },
});

export default ERC20Balance;
