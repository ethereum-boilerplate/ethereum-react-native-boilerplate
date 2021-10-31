import React, { useEffect } from "react";
import { useState } from "react";
import { useMoralis } from "react-moralis";
import {
  Button,
  ActivityIndicator,
  Colors,
  TextInput,
  Card,
} from "react-native-paper";
import { Blockie } from "../Blockie";
import { faAddressBook, faCoins } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";

import { StyleSheet, SafeAreaView, StatusBar, View, Text } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import ERC20Balance from "../Assets/ERC20Balance";

const color = "#315399";

function Transfer() {
  const { Moralis } = useMoralis();
  const [receiver, setReceiver] = useState();
  const [token, setToken] = useState();
  const [tx, setTx] = useState();
  const [amount, setAmount] = useState();
  const [isPending, setIsPending] = useState(false);
  const [address, setAddress] = useState();
  const [validatedAddress, setValidatedAddress] = useState();

  useEffect(() => {
    if (token && amount && receiver) setTx({ amount, receiver, token });
  }, [token, amount, receiver]);

  async function transfer() {
    const { amount, receiver, token } = tx;
    console.log(isPending, "JI");

    const options = {
      type: "erc20",
      amount: Moralis.Units.Token(amount, token.decimals),
      receiver,
      contractAddress: token.token_address,
    };
    setIsPending(true);
    await Moralis.transfer(options)
      .then((tx) => {
        console.log(tx);
        setIsPending(false);
      })
      .catch((e) => {
        alert(e.message);
        setIsPending(false);
      });
  }
  console.log(token, "token");
  return (
    <SafeAreaView style={[styles.container]}>
      <View style={[styles.flex1, styles.inputView]}>
        <View style={styles.viewContainer}>
          <View style={[styles.flex1, { marginTop: 22 }]}>
            <FontAwesomeIcon icon={faAddressBook} size={40} color={color} />
          </View>
          <View style={styles.flex4}>
            <TextInput
              label="Address"
              value={address}
              placeholder="Public address (0x)"
              onChangeText={(text) => setAddress(text)}
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
            <Text style={styles.labelText}>{token ? token.symbol : ""}</Text>
          </View>
        </View>
      </View>
      <View>
        <ERC20Balance setToken={setToken} />
      </View>
      <View style={[styles.flex1, styles.justifyCenter]}>
        <Button
          mode="contained"
          disabled={!tx}
          style={styles.button}
          labelStyle={{ color: "white", fontSize: 20 }}
          onPress={() => transfer()}
          loading={isPending}>
          Transfer
        </Button>
      </View>
    </SafeAreaView>
  );
}

export default Transfer;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    marginTop: StatusBar.currentHeight || 0,
    justifyContent: "space-around",
    backgroundColor: "white",
    paddingHorizontal: 20,
  },
  viewContainer: {
    flexDirection: "row",
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
