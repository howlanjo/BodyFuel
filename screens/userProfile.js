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

import UserFeed from "./UserFeed";

const UserProfile = ({ navigation, route }) => {
  //console.log("looking for this", route.params.userInfo);
  return (
    <View style={styles.borders}>
      <View
        style={[
          styles.borders,
          { flexDirection: "row" },
          { alignItems: "center", alignItems: 'stretch' },
        ]}
      >
        <View style = {{alignSelf: 'center'}}>
          <Image
            style={[{ margin: 10, width: 100, height: 100}]}
            source={require("../assets/profile_picture.jpeg")}
          />
        </View>
        <View style={{ flexDirection: "column", alignItems: 'stretch', flex: 1, padding: 10 }}>
          <TextInput
            value={route.params.userInfo.firstName}
          />
          <TextInput value={route.params.userInfo.lastName} />

          <TextInput value={route.params.userInfo.bio} />
        </View>
        <View style={{flexDirection: 'row-reverse', alignItems: 'flex-start', padding: 10}}>
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
      <View style={[styles.borders, { flex: 3 }]}>
        <View style={{margin: 10, flex: 1}}>
          <Text>Your Data Log:</Text>
          <UserFeed/>
        </View>
      </View>
      
      <View
        style={[
          { margin: 20, justifyContent: "flex-end", alignItems: "flex-end" },
        ]}
      >
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  borders: {
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
