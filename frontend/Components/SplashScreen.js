import React, { useState, useEffect } from "react";
import { ActivityIndicator, View, StyleSheet, Image } from "react-native";
import LottieView from "lottie-react-native";

// import AsyncStorage from "@react-native-community/async-storage";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Animation from "../splashLottie1.json";

const SplashScreen = ({ navigation }) => {
  //State for ActivityIndicator animation
  const [animating, setAnimating] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setAnimating(false);
      //Check if user_id is set or not
      //If not then send for Authentication
      //else send to Home Screen
      AsyncStorage.getItem("user_id").then((value) =>
        navigation.replace(value === null ? "Auth" : "DrawerNavigationRoutes")
      );
    }, 2000);
  }, []);

  return (
    <View style={styles.container}>
      <Image
        source={require("../moralis-logo.png")}
        style={{ width: "90%", resizeMode: "contain", margin: 30 }}
      />
      <LottieView source={Animation} loop autoplay />
      <ActivityIndicator
        animating={animating}
        color="#FFFFFF"
        size="large"
        style={styles.activityIndicator}
      />
    </View>
  );
};

export default SplashScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "white",
  },
  activityIndicator: {
    alignItems: "center",
    height: 80,
  },
});
