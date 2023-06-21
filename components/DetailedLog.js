import {
    Pressable,
    StyleSheet,
    Text,
    View,
} from "react-native";
import React, { useState } from "react";

import WorkoutDataContext from "../context/workoutContext";
import { useContext } from "react";

function DetailedLog({ item, open }) {
    const [modalVisible, setModalVisible] = useState(open);
    const {dbExport} = useContext(WorkoutDataContext)

    console.log(dbExport[item.date])
    
    return (
      <View style={[styles.centeredView, { paddingBottom: 10, paddingLeft: 10 }]}>
        <Pressable
        style = {{ ...StyleSheet.absoluteFillObject, top: 0, bottom: 0, right: 0, left: 0, opacity: 0.25, backgroundColor: 'black'}}
        onPress = {() => {
          setModalVisible(false);
          open(false);
          console.log("reg")
        }}/>       
          
        <View
          style={styles.modalView}
        >
          <Text style={{padding: 50}}>Deatiled View coming soon</Text>
          
        </View>
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
      backgroundColor: "#2196F3"
    },
    numberField: {
      marginLeft: 5,
      marginRight: 5,
      color: "black",
      fontSize: 20,
    },
  });
  
  export default DetailedLog;
  