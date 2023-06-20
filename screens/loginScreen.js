import { Image, ListItem } from "react-native-elements";
import React, { useContext, useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

import FirebaseContext from "../context/firebaseContext";
import { auth } from "../helper/firebaseConfig";

const LoginScreen = ({ navigation, route }) => {
  const [email, setEmail] = useState("me@test.com");
  const [password, setPassword] = useState("password");
  const { fb } = useContext(FirebaseContext);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        navigation.replace("Home Page", { uid: user.uid });
      }
    });

    return unsubscribe;
  }, []);

  const handleSignUp = () => {
    auth
      .createUserWithEmailAndPassword(email, password)
      .then((userCredentials) => {
        const user = userCredentials.user;
        console.log("right before initializedb")
        fb.initializeDb(user.uid)
      })
      .catch((error) => alert(error.message));
  };

  const handleLogin = () => {
    auth
      .signInWithEmailAndPassword(email, password)
      .then((userCredentials) => {
        const user = userCredentials.user;
        console.log("Logged in with:", user.email);
      })
      .catch((error) => alert(error.message));
  };

  return (
    <View style={styles.screen}>
      <Image
            style={[{ margin: 10, width: 800, height: 140 }]}
            source={require("../assets/logo.png")}
      />

      <TextInput
        style={[styles.textFields]}
        placeholder="Email"
        onChangeText={(text) => setEmail(text)}
        value={email}
      />
      <TextInput
        style={styles.textFields}
        placeholder="Password"
        value={password}
        onChangeText={(text) => setPassword(text)}
        secureTextEntry={true}
      />
      <TouchableOpacity
        style= {styles.button}
      >
        <Text 
        style={[styles.buttonText]}
        onPress={handleLogin}>Login</Text>
      </TouchableOpacity>
      <TouchableOpacity
      style= {styles.button}
      >
        <Text 
        style={[styles.buttonText, {fontSize: 14}]}
        onPress={handleSignUp}>Register</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  textFields: {
    fontSize: 22,
    backgroundColor: "white",
    width: 200
  },
  button: {
    backgroundColor: "#2196F3",
    margin: 3,
    padding: 5,
    paddingLeft: 15,
    paddingRight: 15,
    borderRadius: 25
  },
  buttonText: {
    fontSize: 24,
    color: 'white'

  }
});

export default LoginScreen;
