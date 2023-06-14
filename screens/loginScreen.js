import {
  FlatList,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { Image, ListItem } from "react-native-elements";
import React, { useEffect, useState } from "react";

import { auth } from "../helper/firebaseConfig";
import { initBodyFuelDB } from "../helper/firebaseHelper";

const LoginScreen = ({ navigation, route }) => {
  const [email, setEmail] = useState("me@test.com");
  const [password, setPassword] = useState("password");

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        //console.log("User: ", user);
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
        console.log("Registered with:", user.email);
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
      <TextInput
        style={styles.textFields}
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
      <TouchableOpacity>
        <Text onPress={handleLogin}>Login</Text>
      </TouchableOpacity>
      <TouchableOpacity>
        <Text onPress={handleSignUp}>Register</Text>
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
  },
  button: {
    fontSize: 24,
  },
});

export default LoginScreen;
