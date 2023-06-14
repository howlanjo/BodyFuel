import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import DataEntry from "./dataEntry";
import WorkoutGraph from "./workoutGraph";
import {
  getBodyFuelUserData
} from "../helper/firebaseHelper";
import { organizeRawData } from "../helper/dataOrganization";
import { useEffect } from "react";

const HomePage = ({ navigation, route }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [userInfo, setUserInfo] = useState({});
  const [uid, setUid] = useState("");
 
  useEffect(() => {
    if (route.params?.uid != "undefined") {
      setUid(route.params.uid);
    }
    getBodyFuelUserData((userData) => {
      setUserInfo(userData);
    });
    
  }, []);

  useEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        <TouchableOpacity
          onPress={() => {
            console.log("Settings page");
            navigation.navigate("User Settings");
          }}
        >
          <Text style={{ color: "black", fontSize: 18 }}>Settings</Text>
        </TouchableOpacity>
      ),

      headerRight: () => (
        <TouchableOpacity
          onPress={() => {
            navigation.navigate("User Profile", { userInfo });
          }}
        >
          <Text style={{ color: "black", fontSize: 18 }}>Profile</Text>
        </TouchableOpacity>
      ),
    });
  });

  return (
    <View style={styles.leftView}>
      <WorkoutGraph userId = {uid}/>
      <DataEntry />
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  leftView: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "bottom",
    margin: 10,
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  buttonClose: {
    backgroundColor: "#2196F3",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },
});

export default HomePage;
