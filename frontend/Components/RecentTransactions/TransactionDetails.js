import React, { useState } from "react";
import { useMoralis } from "react-moralis";
import {
  FlatList,
  View,
  Text,
  Image,
  StyleSheet,
  Pressable,
  ActivityIndicator,
  Clipboard,
  Linking,
  Alert,
} from "react-native";
import { getEllipsisTxt } from "../../utils/formatters";
import { Divider, Card, Button, Tooltip } from "@ui-kitten/components";
import { faCopy } from "@fortawesome/free-regular-svg-icons";
import { faExternalLinkAlt } from "@fortawesome/free-solid-svg-icons";

import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { getExplorer } from "../../helpers/networks";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useMoralisDapp } from "../../providers/MoralisDappProvider/MoralisDappProvider";

function TransactionDetails(props) {
  const [tipVisible, setTipVisible] = useState(false);
  const { chainId } = useMoralisDapp();

  const copyToClipboard = () => {
    Clipboard.setString(props?.transactionDetails.address);
    setTipVisible(true);
  };

  const renderAddress = () => (
    <TouchableOpacity onPress={() => copyToClipboard()}>
      <Text
        ellipsizeMode={"middle"}
        numberOfLines={1}
        style={styles.contentLabel}>
        {props?.transactionDetails.address}{" "}
        <FontAwesomeIcon icon={faCopy} color="grey" />
      </Text>
    </TouchableOpacity>
  );

  return (
    <Card disabled={true} style={styles.cardView}>
      <View style={styles.centeredView}>
        <Text style={styles.headerText}>👓Transaction Details</Text>
        <Divider />
        <Text style={styles.label}>Transaction Hash </Text>
        <Text
          style={styles.linkText}
          ellipsizeMode={"middle"}
          numberOfLines={1}
          onPress={() =>
            Linking.openURL(
              `${getExplorer(chainId)}/tx/${
                props?.transactionDetails.transaction_hash
              }`
            )
          }
          dataDetectorType={"link"}>
          {props?.transactionDetails.transaction_hash}{" "}
          <FontAwesomeIcon icon={faExternalLinkAlt} color="grey" size={15} />
        </Text>

        <Text style={styles.label}>Token Address</Text>
        <Tooltip
          anchor={renderAddress}
          visible={tipVisible}
          onBackdropPress={() => setTipVisible(false)}>
          Copied Address 😻
        </Tooltip>

        <Divider />

        <Text style={styles.label}>Block Number</Text>
        <Text>{props?.transactionDetails.block_number}</Text>

        <Text style={styles.label}>From Address</Text>
        <Text
          style={styles.contentLabel}
          ellipsizeMode={"middle"}
          numberOfLines={1}>
          {props?.transactionDetails.from_address}
        </Text>

        <Text style={styles.label}>To Address</Text>
        <Text
          style={styles.contentLabel}
          ellipsizeMode={"middle"}
          numberOfLines={1}>
          {props?.transactionDetails.to_address}
        </Text>
      </View>

      <Button style={styles.button} onPress={() => props.setShowModal(false)}>
        DISMISS
      </Button>
    </Card>
  );
}

const styles = StyleSheet.create({
  cardView: {
    borderRadius: 15,
  },
  centeredView: {
    flex: 1,
    paddingHorizontal: 5,
    justifyContent: "center",
    alignItems: "flex-start",
    borderRadius: 10,
  },
  label: {
    fontSize: 15,
    color: "#414a4c",
    paddingTop: 10,
    fontWeight: "600",
  },
  contentLabel: {
    width: "50%",
  },
  headerText: {
    color: "black",
    fontWeight: "600",
    fontSize: 25,
  },
  linkText: { color: "black", fontSize: 15 },
  button: {
    marginVertical: 5,
    paddingTop: 5,
  },
});

export default TransactionDetails;
