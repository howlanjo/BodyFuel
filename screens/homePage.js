import { Image, ListItem } from "react-native-elements";
import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import {
  getBodyFuelWorkoutData,
  initBodyFuelDB,
  setupBodyFuelListener,
  storeBodyFuelItem,
} from "../helper/firebaseHelper";

import DataEntry from "./dataEntry";
import WorkoutGraph from "./workoutGraph";
import { organizeRawData } from "../helper/dataOrganization";
import { useEffect } from "react";

const HomePage = ({ navigation, route }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [userInfo, setUserInfo] = useState({});
  const [uid, setUid] = useState("");
  const [workoutData, setWorkoutData] = useState([]);
  const [weightData, setWeightData] = useState([]);

  useEffect(() => {
    console.log("You should only see this once. ", route.params);

    if (route.params?.uid != "undefined") {
      setUid(route.params.uid);
      console.log("route.params.uid: ", route.params.uid);
      console.log("uid: ", uid);
    }
    setupBodyFuelListener((userData) => {
      console.log("Initial findings: ", userData);
      setUserInfo(userData);
    });

    getBodyFuelWorkoutData((workoutDataFromDB) => {
      console.log("workoutDataFromDB: ", workoutDataFromDB);
      setWorkoutData(workoutDataFromDB);
      w = organizeRawData(workoutDataFromDB);
      setWeightData(w);
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
      <WorkoutGraph data={weightData} />
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
