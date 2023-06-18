import {
  Alert,
  Modal,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React, { useState } from "react";

import DropDownPicker from "react-native-dropdown-picker";
import FirebaseContext from "../context/firebaseContext";
import { Input } from "react-native-elements";
import MaskInput from "react-native-mask-input";
import { pad } from "../helper/dataOrganization";
import { storeBodyFuelDataset } from "../helper/firebaseHelper";
import { useContext } from "react";

function DataEntry(props) {
  const [modalVisible, setModalVisible] = useState(false);

  let d = new Date().toLocaleDateString().split("/");
  const [dateInput, setDateInput] = useState(
    `${pad(d[0], 2)}${pad(d[1], 2)}${d[2]}`
  );
  const [weightInput, setWeightInput] = useState("");
  const [waterInput, setWaterInput] = useState("");
  //const [foodInput, setFoodInput] = useState("");
  const [sleepInput, setSleepInput] = useState("");

  const [open, setOpen] = useState(false);
  const [open2, setOpen2] = useState(false);
  const {fb} = useContext(FirebaseContext);

  const saveAndStoreData = () => {
    fb.storeBodyFuelDataset(dateInput, {
      date: dateInput,
      workoutType: selectedWorkout,
      weight: weightInput,
      water: waterInput,
      food: selectedFood,
      sleep: sleepInput,
    });
  };
  const [selectedFood, setSelectedFood] = useState();
  const [foodItems, setFoodItems] = useState([
    { label: "Poor", value: 1 },
    { label: "Okay", value: 2 },
    { label: "Good", value: 3 },
    { label: "Great", value: 4},
  ]);

  const [selectedWorkout, setSelectedWorkout] = useState();
  const [workoutList, setWorkoutList] = useState([
    { label: "Bench", value: 1 },
    { label: "Squat", value: 2 },
    { label: "DeadLift", value: 3 },
    { label: "Run", value: 4},
  ]);

  return (
    <View style={[styles.centeredView, { paddingBottom: 10, paddingLeft: 10 }]}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
          setModalVisible(!modalVisible);
        }}
      >
        <View style={[styles.centeredView, ]}>
          <View
            style={[
              styles.modalView,
              { paddingBottom: 15},
            ]}
          >
            <View
              style={{
                alignItems: "flex-end",
                justifyContent: "flex-end",
                flexDirection: "row",
              }}
            >
              <Pressable
                style={[styles.button]}
                onPress={() => setModalVisible(false)}
              >
                <Text
                  style={[styles.textStyle, { color: "black", fontSize: 24 }]}
                >
                  x
                </Text>
              </Pressable>
            </View>

            <MaskInput
              style={[
                styles.numberField,
                { paddingLeft: 10, paddingBottom: 10 },
              ]}
              value={dateInput}
              onChangeText={(masked, unmasked) => {
                setDateInput(unmasked); // you can use the unmasked value as well

                // assuming you typed "9" all the way:
                console.log(masked); // (99) 99999-9999
                console.log(unmasked); // 99999999999
              }}
              mask={[/\d/, /\d/, "/", /\d/, /\d/, "/", /\d/, /\d/, /\d/, /\d/]}
            />

            <Text>Enter Workout</Text>
            <View style={{flexDirection: 'row', width:'50%', zIndex: 4}}>
              <DropDownPicker
                open={open2}
                value={selectedWorkout}
                items={workoutList}
                setOpen={setOpen2}
                setValue={setSelectedWorkout}
                setItems={setWorkoutList}
                
                style={{zIndex:3}} 
                
              />

              <Input
                style={[styles.numberField, {width: '50%'}]}
                placeholder="Enter Weight"
                value={weightInput}
                onChangeText={setWeightInput}
                keyboardType="numeric"
                
              />
            </View>
            
            <Input
              style={styles.numberField}
              placeholder="Enter Water"
              value={waterInput}
              onChangeText={setWaterInput}
              keyboardType="numeric"
            />
            <View>
            <Text>Select Food</Text>
            <DropDownPicker
              open={open}
              value={selectedFood}
              items={foodItems}
              setOpen={setOpen}
              setValue={setSelectedFood}
              setItems={setFoodItems}
              style={{zIndex:1}}
            />
            </View>

            {/* <Input
              style={styles.numberField}
              placeholder="Enter Food" //#TODO
              value={foodInput}
              onChangeText={setFoodInput}
              keyboardType="numeric"
            /> */}

            <Input
              style={styles.numberField}
              placeholder="Enter Sleep (hr)"
              value={sleepInput}
              onChangeText={setSleepInput}
              keyboardType="numeric"
            />

            <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={() => {
                setModalVisible(!modalVisible);
                saveAndStoreData();
              }}
            >
              <Text style={styles.textStyle}>Log Data</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
      <Pressable
        style={[styles.button, styles.buttonOpen]}
        onPress={() => setModalVisible(true)}
      >
        <Text style={styles.textStyle}>Enter Data</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
    //backgroundColor: 'blue'
  },
  modalView: {
    backgroundColor: "white",
    borderRadius: 20,
    //padding: 15,
    //alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    width: '90%',
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
  numberField: {
    marginLeft: 5,
    marginRight: 5,
    color: "black",
    fontSize: 20,
  },
});

export default DataEntry;
