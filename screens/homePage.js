import { FlatList, Modal, Pressable, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Image, ListItem } from "react-native-elements";
import React , {useState} from "react";

import { Button } from "react-native-elements";
import DataEntry from "./dataEntry";
import EditEmployee from "./testModal";
import { useEffect } from "react";

const HomePage = ({navigation}) => {
    const [modalVisible, setModalVisible] = useState(false);

    useEffect(() =>{
        
        navigation.setOptions({
           headerLeft: () => (
               <TouchableOpacity 
                onPress={() => {
                    console.log("Settings page")
                    navigation.navigate("User Settings")
                }}
                >
                <Text style={{color:'black', fontSize: 18}} >Settings</Text>
               </TouchableOpacity>
           ),

           headerRight: () => (
               <TouchableOpacity 
               onPress = {() => {
                   navigation.navigate("User Profile")
               }}
           >
               <Text style={{color:'black', fontSize: 18}}>Profile</Text>
           </TouchableOpacity> 
           ),

       })
   })

    return (

      <View style={styles.leftView}>
        <DataEntry />
          {/* <Modal
              animationType="slide"
              transparent={true}
              visible={modalVisible}
              onRequestClose={() => {
              setModalVisible(!modalVisible);
              }}>
              <View style={styles.centeredView}>
                  <DataEntry />
                  
                  <Pressable
                      style={[styles.button, styles.buttonClose]}
                      onPress={() => {
                        setModalVisible(!modalVisible)
                        console.log('This worked: ')
                        }}>
                          
                      <Text>Enter Data</Text>
                  </Pressable>
              </View>
          </Modal> */}
          
          {/* <Pressable
              style={[styles.button, styles.buttonOpen]}
              onPress={() => setModalVisible(true)}>
              <Text style={styles.textStyle}>Add Data</Text>
          </Pressable> */}
      </View>
    )
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
    },
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 22,
      },
      leftView: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'bottom',
        margin: 22,
        //borderWidth: 1,
      },
      modalView: {
        margin: 20,
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 35,
        alignItems: 'center',
        shadowColor: '#000',
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
});

export default HomePage;