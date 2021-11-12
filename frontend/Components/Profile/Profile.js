import React from "react";
import {
  StyleSheet,
  TextInput,
  StatusBar,
  View,
  Text,
  ScrollView,
  Button,
} from "react-native";
import {
  useMoralis,
  useMoralisWeb3Api,
  useMoralisWeb3ApiCall,
} from "react-moralis";

const Profile = ({ navigation }) => {
  const {
    authenticate,
    authError,
    isAuthenticating,
    isAuthenticated,
    logout,
    Moralis,
  } = useMoralis();

  const logoutUser = () => {
    if (isAuthenticated) {
      logout();
      navigation.replace("Auth");
    }
  };
  return (
    <View style={styles.container}>
      <View style={styles.button}>
        <Button
          title="Logout"
          color="white"
          disabledStyle={{
            borderWidth: 2,
            borderColor: "#00F",
          }}
          onPress={logoutUser}
          loadingProps={{ animating: true }}></Button>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: StatusBar.currentHeight || 0,
    backgroundColor: "white",
  },
  button: {
    width: 200,
    backgroundColor: "red",
    elevation: 10,
    borderRadius: 15,
    shadowColor: "grey",
    shadowOffset: { width: 1, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 1,
  },
});

export default Profile;
