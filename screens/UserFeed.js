import {
  FlatList,
  Pressable,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { deleteBodyFuelDataset, getBodyFuelWorkoutData } from "../helper/firebaseHelper";
import { useEffect, useState } from 'react';

import FirebaseContext from '../context/firebaseContext';
import React from 'react';
import { WorkoutDataBase } from "../helper/dataClass";
import { useContext } from 'react';

const DayLog = ({item, fb }) => {
  
    return (
        <Pressable
            onLongPress={() => {
                console.log("longPress! ", item)
                fb.deleteBodyFuelDataset(item)
            }}
        >
        <View style={styles.item}>
            <Text style={styles.title}>Date: {item.date}</Text>
            <Text>Workout: {item.data[0].weight}</Text>
            <Text>Sleep: {item.data[0].sleep}</Text>
            <Text>Water: {item.data[0].water}</Text>
            <Text>Food: {item.data[0].food}</Text>
        </View>
        </Pressable>  
)};

const dbToArr = (inDB) => {
    console.log("inDB: ", inDB)
    keys = Object.keys(inDB)
    let aaa = []
    for (item of keys){
        aaa.push({date: item, data: Object.values(inDB[item])})
    }

    console.log("aaa: ", aaa)
    return aaa;
} 

const UserFeed = () => {
    const [refresh, setRefresh] = useState(true);
    const [feedData, setFeedData] = useState([]);
    const {fb} = useContext(FirebaseContext);

    useEffect(() => {
        if(refresh == true){
    
          fb.getBodyFuelWorkoutData((workoutDataFromDB) => {
            setFeedData(dbToArr(workoutDataFromDB))
          });
        }
      }, [refresh]);


  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={feedData}
        renderItem={({ item }) => <DayLog item={item} fb ={fb}/>}
        keyExtractor={item => item.date }
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
  },
  item: {
    backgroundColor: '#f9c2ff',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  title: {
    fontSize: 18,
  },
});

export default UserFeed;