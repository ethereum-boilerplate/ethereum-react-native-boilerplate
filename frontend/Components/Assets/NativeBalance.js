import React, { useEffect, useState } from "react";
import { useMoralis, useMoralisWeb3Api } from "react-moralis";
import { View, Text, StyleSheet } from "react-native";
import { useMoralisDapp } from "../../providers/MoralisDappProvider/MoralisDappProvider";
import { n4 } from "../../utils/formatters";

import { getNativeByChain } from "../../utils/getNativeByChain";

function NativeBalance() {
  const { account } = useMoralisWeb3Api();
  const { Moralis } = useMoralis();
  const { walletAddress, chainId: chain } = useMoralisDapp();
  const [nativeBalance, setNativeBalance] = useState();
  const [nativeChainString, setNativeChainString] = useState();

  const [address, setAddress] = useState();

  useEffect(() => {
    setAddress(walletAddress);
  }, [walletAddress]);

  const fetchNativeBalance = async () => {
    const options = { address, chain };

    const native = getNativeByChain(chain);

    account
      .getNativeBalance(options)
      .then((result) => {
        const balanceInWei = Moralis.Units.FromWei(result.balance);
        const balanceFormatted = `${n4.format(balanceInWei)} ${native}`;
        setNativeChainString(native);
        setNativeBalance(balanceFormatted);
      })
      .catch((e) => alert(e.message));
  };

  useEffect(() => {
    if (address && chain) {
      fetchNativeBalance();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [address, chain]);

  return (
    <View style={styles.itemView}>
      <Text style={styles.name}>{nativeChainString} Balance : </Text>
      <View style={styles.nameView}>
        <Text style={styles.name}>{nativeBalance}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  itemView: {
    backgroundColor: "white",
    padding: 20,
    // marginVertical: 8,
    marginHorizontal: 2,
    flex: 1,
    flexDirection: "row",
  },
  name: {
    fontSize: 15,
    color: "black",
    fontWeight: "500",
  },
  nameView: {
    flex: 1,
    alignItems: "flex-end",
  },
});

export default NativeBalance;
