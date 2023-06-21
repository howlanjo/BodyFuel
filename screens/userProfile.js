import {
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";

import FirebaseContext from "../context/firebaseContext";
import { Image } from "react-native-elements";
import UserFeed from "../components/UserFeed";
import { useContext } from "react";

const UserProfile = ({ navigation, route }) => {
  const [first, setFirst] = useState("");
  const [last, setLast] = useState("");
  const [bio, setBio] = useState("");
  const [editMode, setEditMode] = useState(false)
  const {fb} = useContext(FirebaseContext);

  useEffect(() => {
    setFirst(route.params.userInfo.firstName);
    setLast(route.params.userInfo.lastName);
    setBio(route.params.userInfo.bio);

  }, [route.params.userInfo])

  const getEditText = () => {
    if (editMode === false){
      return "Edit"
    }
    return "Update"
  }

  return (
    <View style={styles.borders}>
      <View
        style={[
          styles.borders,
          { flexDirection: "row" },
          { alignItems: "center", alignItems: "stretch" },
        ]}
      >
        <View style={{ alignSelf: "center" }}>
          <Image
            style={[{ margin: 10, width: 100, height: 100 }]}
            source={require("../assets/profile_picture.jpeg")}
          />
        </View>
        <View
          style={{
            flexDirection: "column",
            alignItems: "stretch",
            flex: 1,
            padding: 10,
          }}
        >
          <TextInput
            style={[styles.title, {backgroundColor: (editMode === false) ? 'transparent':'#D3D3D3'}]}
            value={first}
            onChangeText={setFirst}
          />
          <TextInput
            style={[styles.title, {backgroundColor: (editMode === false) ? 'transparent':'#D3D3D3'}]}
            value={last}
            onChangeText={setLast}
          />

          <TextInput 
            style={[styles.body, {backgroundColor: (editMode === false) ? 'transparent':'#D3D3D3'}]} 
            value={bio} 
            onChangeText={setBio}
          />
        </View>
        <View
          style={{
            flexDirection: "row-reverse",
            alignItems: "flex-start",
            padding: 10,
          }}
        >
          <Pressable
            style={[styles.button, styles.buttonOpen]}
            onPress={() => {
              if(editMode === true){
                fb.setBodyFuelUserData({bio: bio, firstName: first, lastName: last})
              }

              setEditMode(!editMode)
            }}
          >
          <Text style={styles.textStyle}>{getEditText()}</Text>
          </Pressable>
        </View>
      </View>
      <View style={[styles.borders, { flex: 3 }]}>
        <View style={{ margin: 10, flex: 1 }}>
          <Text>Your Data Log:</Text>
          <UserFeed />
        </View>
      </View>

      <View
        style={[
          { margin: 20, justifyContent: "flex-end", alignItems: "flex-end" },
        ]}
      ></View>
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
    fontSize: 11
  },
  title: {
    fontSize: 24,
    marginBottom: 5,
    paddingLeft: 5
  },
  body: {
    fontSize: 16,
    marginBottom: 5,
    paddingLeft: 5
  },
});

export default UserProfile;
