import {
  FlatList,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { Image, Input, ListItem } from "react-native-elements";
import React, { useState } from "react";

const UserProfile = ({ navigation, route }) => {
  console.log("looking for this", route.params.userInfo);
  return (
    <View style={styles.borders}>
      <View
        style={[
          styles.borders,
          { flexDirection: "row" },
          { alignItems: "center" },
        ]}
      >
        <Image
          style={[{ margin: 10 }, { width: 100, height: 100 }]}
          source={require("../assets/profile_picture.jpeg")}
        />
        <View style={{ flexDirection: "column" }}>
          <TextInput
            style={{ borderWidth: 1 }}
            value={route.params.userInfo[0].firstName}
          />
          <TextInput value={route.params.userInfo[0].lastName} />

          <TextInput value={route.params.userInfo[0].bio} />
        </View>
      </View>
      <View style={[styles.borders, { flex: 3 }]}>
        <Text style={{ margin: 25 }}>
          Information about their PRs and max weights will reside here.
        </Text>
      </View>
      <View
        style={[
          { margin: 20, justifyContent: "flex-end", alignItems: "flex-end" },
        ]}
      >
        <Pressable
          style={[styles.button, styles.buttonOpen]}
          onPress={() => {
            console.log("Edit Pressed");
          }}
        >
          <Text style={styles.textStyle}>Edit</Text>
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  borders: {
    borderWidth: 1,
    flex: 1,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
    backgroundColor: "#2196F3",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
});

export default UserProfile;
