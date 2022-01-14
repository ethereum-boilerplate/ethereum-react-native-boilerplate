import React from "react";
import { View, StyleSheet } from "react-native";

// import Address from "./Address";

export default function Header() {
  return (
    <View style={styles.viewContainer}>
      {/* <Address /> */}
    </View>
  );
}
const styles = StyleSheet.create({
  viewContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
});
