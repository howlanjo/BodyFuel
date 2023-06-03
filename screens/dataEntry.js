import {Alert, Modal, Pressable, StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';

import { Input } from "react-native-elements";

function DataEntry(props) {
    const [modalVisible, setModalVisible] = useState(false);

    const [dateInput, setDateInput] = useState("")
    const [weightInput, setWeightInput] = useState("");
    const [waterInput, setWaterInput] = useState("");
    const [foodInput, setFoodInput] = useState("");
    const [sleepInput, setSleepInput] = useState("");

  return (
    <View style={styles.centeredView}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert('Modal has been closed.');
          setModalVisible(!modalVisible);
        }}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>

            <Text style={styles.modalText}>Log Data</Text>

            <Input style={styles.numberField}
            placeholder="Enter Date"
            value={dateInput}
            onChangeText={setDateInput}
            keyboardType="numeric"
            />

            <Input style={styles.numberField}
            placeholder="Enter Weight"
            value={weightInput}
            onChangeText={setWeightInput}
            keyboardType="numeric"
            />

            <Input style={styles.numberField}
            placeholder="Enter Water"
            value={waterInput}
            onChangeText={setWaterInput}
            keyboardType="numeric"
            />

            <Input style={styles.numberField}
            placeholder="Enter Food" //#TODO
            value={foodInput}
            onChangeText={setFoodInput}
            keyboardType="numeric"
            />

            <Input style={styles.numberField}
            placeholder="Enter Sleep (hr)"
            value={sleepInput}
            onChangeText={setSleepInput}
            keyboardType="numeric"
            />
            
            <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={() => setModalVisible(!modalVisible)}>
              <Text style={styles.textStyle}>Save</Text>
            </Pressable>

          </View>
        </View>
      </Modal>
      <Pressable
        style={[styles.button, styles.buttonOpen]}
        onPress={() => setModalVisible(true)}>
        <Text style={styles.textStyle}>Enter Data</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 15,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    width: 300,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: '#F194FF',
  },
  buttonClose: {
    backgroundColor: '#2196F3',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
  numberField: {
    marginLeft: 5,   
    marginRight: 5,  
    color: 'black',
},
});

export default DataEntry;
