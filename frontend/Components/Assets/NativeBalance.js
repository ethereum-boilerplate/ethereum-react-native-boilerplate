import React, { useEffect, useState } from "react";
import { useMoralis, useMoralisWeb3Api } from "react-moralis";
import { View, Text, StyleSheet } from "react-native";
import { useMoralisDapp } from "../../providers/MoralisDappProvider/MoralisDappProvider";
import { n4 } from "../../utils/formatters";

import { getNativeByChain } from "../../utils/getNativeByChain";

function NativeBalance(props) {
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
    const chainFinal = props?.chain || chainId;
    const options = { address, chainFinal };

    const native = getNativeByChain(chainFinal);

    account
      .getNativeBalance(options)
      .then((result) => {
        const balanceInWei = Moralis.Units.FromWei(result.balance);
        const balanceFormatted = `${n4.format(balanceInWei)} ${native}`;
        console.log(result, "RESULT");
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
      <Text style={styles.name}>
        {nativeChainString}💰{nativeBalance}{" "}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  itemView: {
    backgroundColor: "white",
    padding: 20,
    // marginVertical: 8,
    marginHorizontal: 2,
    marginVertical: 5,
    borderRadius: 10,
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
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
