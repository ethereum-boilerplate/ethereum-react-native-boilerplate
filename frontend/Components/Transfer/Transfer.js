import React, { useEffect } from "react";
import { useState } from "react";
import { useMoralis, useWeb3Transfer } from "react-moralis";
import { Button } from "@ui-kitten/components";
import { ActivityIndicator, Colors, TextInput, Card } from "react-native-paper";
import { Blockie } from "../Blockie";
import { faAddressBook, faCoins } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";

import { StyleSheet, SafeAreaView, StatusBar, View, Text } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import ERC20Balance from "../Assets/ERC20Balance";
import { useWalletConnect } from "../../WalletConnect";

const color = "#315399";

function Transfer() {
  const [receiver, setReceiver] = useState();
  const [token, setToken] = useState();
  const [tx, setTx] = useState();
  const [amount, setAmount] = useState();
  const [isPending, setIsPending] = useState(false);
  const [validatedAddress, setValidatedAddress] = useState();

  const [transferOptionsState, setTransferOptionsState] = useState();

  const { fetch, error, isFetching } = useWeb3Transfer(transferOptionsState);

  const { Moralis } = useMoralis();
  const tokenDecimals = token ? token.decimals : "18";
  const tokenAddress = token ? token.token_address : "";

  useEffect(() => {
    if (token && amount && receiver)
      setTransferOptionsState({
        amount: Moralis.Units.Token(amount, tokenDecimals), //Moralis.Units.ETH(0.5) -- if you want to send native currency
        receiver: receiver,
        type: "erc20", // type: "native" -- if you want to send native currency
        contractAddress: tokenAddress,
      });
  }, [token, amount, receiver]);

  const TransferTheCoins = () => {
    //console.log("TRANSFER CLICKED", transferOptionsState);
    fetch();
  };

  // console.log(token, "token");
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={styles.scrollViewContainer}>
          <Text style={styles.headerText} category="h4">
            🚀 Transfer
          </Text>

          <View style={[styles.flex1, styles.inputView]}>
            <View style={styles.viewContainer}>
              <View style={[styles.flex1, { marginTop: 22 }]}>
                <FontAwesomeIcon icon={faAddressBook} size={40} color={color} />
              </View>
              <View style={styles.flex4}>
                <TextInput
                  label="Address"
                  value={receiver}
                  placeholder="Public address (0x)"
                  onChangeText={(text) => setReceiver(text)}
                  style={{ backgroundColor: "white" }}
                  maxLength={42}
                />
              </View>
            </View>

            <View style={styles.viewContainer}>
              <View style={[styles.flex1, { marginTop: 22 }]}>
                <FontAwesomeIcon icon={faCoins} size={40} color={color} />
              </View>
              <View style={styles.flex4}>
                <TextInput
                  label="Amount"
                  value={amount}
                  keyboardType="numeric"
                  onChangeText={(text) => setAmount(text)}
                  style={{ backgroundColor: "white" }}
                />
              </View>
            </View>

            <View style={styles.viewContainer}>
              <View style={{ flex: 1 }}>
                <Text style={styles.labelText}>Asset:</Text>
              </View>
              <View style={{ flex: 4 }}>
                <Text style={styles.labelText}>
                  {token ? token.symbol : ""}
                </Text>
              </View>
            </View>
          </View>
          <View>
            <ERC20Balance setToken={setToken} />
          </View>
          <View style={[styles.flex1, styles.justifyCenter]}>
            <Button
              mode="contained"
              disabled={!(token && receiver && amount)}
              style={
                token && receiver && amount
                  ? styles.button
                  : styles.diabledButton
              }
              labelStyle={{ color: "white", fontSize: 20 }}
              onPress={TransferTheCoins}>
              Transfer
            </Button>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

export default Transfer;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    marginTop: StatusBar.currentHeight || 0,
    backgroundColor: "white",
  },
  scrollViewContainer: {
    paddingHorizontal: 20,
    paddingTop: 10,
  },
  viewContainer: {
    flexDirection: "row",
  },
  headerText: {
    color: "black",
    fontWeight: "600",
    fontSize: 30,
  },
  inputView: {
    borderColor: "grey",
    borderRadius: 15,
    borderWidth: 0.5,
    justifyContent: "space-around",
    // shadowOffset: "5",
    elevation: 10,
    marginTop: 10,
    padding: 20,
    shadowColor: "grey",
    // shadowOffset: { width: 0, height: 3 },
    // shadowOpacity: 0.2,
    // shadowRadius: 10,
  },
  scrollView: {
    backgroundColor: "white",
    marginHorizontal: 10,
  },
  labelText: {
    fontSize: 20,
    fontWeight: "400",
  },
  button: {
    backgroundColor: "green",
    elevation: 5,
  },
  diabledButton: {
    backgroundColor: "grey",
  },
  justifyCenter: {
    justifyContent: "space-around",
  },
  flex1: {
    flex: 1,
  },
  flex4: {
    flex: 4,
  },
});
