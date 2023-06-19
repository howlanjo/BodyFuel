import {
  Alert,
  KeyboardAvoidingView,
  Modal,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  Touchable,
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
  const [workoutInput, setWorkoutInput] = useState("");
  const [waterInput, setWaterInput] = useState("");
  //const [foodInput, setFoodInput] = useState("");
  const [sleepInput, setSleepInput] = useState("");

  const [open, setOpen] = useState(false);
  const [open2, setOpen2] = useState(false);
  const {fb} = useContext(FirebaseContext);

  const saveAndStoreData = () => {
    fb.storeBodyFuelDataset(dateInput, {
      date: dateInput,
      bench: (selectedWorkout == 1) ? workoutInput : 0,
      squat: (selectedWorkout == 2) ? workoutInput : 0,
      deadLift: (selectedWorkout == 3) ? workoutInput : 0,
      run: (selectedWorkout == 4) ? workoutInput : 0,
      water: (waterInput != "") ? waterInput : 0,
      food: (selectedFood != undefined) ? selectedFood : 0,
      sleep: (sleepInput != "") ? sleepInput : 0,
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
        <KeyboardAvoidingView style={styles.centeredView }
        behavior={Platform.OS === "ios" ? "padding" : "height"}  
        >
          <Pressable
          style = {{ ...StyleSheet.absoluteFillObject, top: 0, bottom: 0, right: 0, left: 0, opacity: 0.25, backgroundColor: 'black'}}
          onPress = {() => {
            setModalVisible(false);
          }}/>       
           
          <View
            style={styles.modalView}
          >
            {/* <View
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
                </Text>
              </Pressable>
            </View> */}

            <MaskInput
              style={[
                styles.numberField,
                { paddingLeft: 10, paddingBottom: 10 },
              ]}
              value={dateInput}
              onChangeText={(masked, unmasked) => {
                setDateInput(unmasked); // you can use the unmasked value as well
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
                value={workoutInput}
                onChangeText={setWorkoutInput}
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

            <Input
              style={styles.numberField}
              placeholder="Enter Sleep (hr)"
              value={sleepInput}
              onChangeText={setSleepInput}
              keyboardType="numeric"
            />

            <Pressable
              style={[styles.button, {backgroundColor: "#2196F3", alignSelf: 'center'}]}
              onPress={() => {
                setModalVisible(!modalVisible);
                saveAndStoreData();
              }}
            >
              <Text style={styles.textStyle}>Log Data</Text>
            </Pressable>
          </View>
        </KeyboardAvoidingView>
      </Modal>
      <Pressable
        style={[styles.button]}
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
  },
  modalView: {
    backgroundColor: "white",
    paddingTop: 10,
    paddingBottom: 20,
    paddingLeft: 20,
    paddingRight: 20,
    borderRadius: 20,
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
  // buttonOpen: {
  //   backgroundColor: "#F194FF",
  // },
  // buttonClose: {
  //   backgroundColor: "#2196F3",
  // },
  // textStyle: {
  //   color: "white",
  //   fontWeight: "bold",
  //   textAlign: "center",
  // },
  // modalText: {
  //   marginBottom: 15,
  //   textAlign: "center",
  // },
  numberField: {
    marginLeft: 5,
    marginRight: 5,
    color: "black",
    fontSize: 20,
  },
});

export default DataEntry;
