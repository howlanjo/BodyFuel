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

import React from 'react';
import { WorkoutDataBase } from "../helper/dataClass";

// const DayLog = ({date, data}) => (
//   <View style={styles.item}>
//     <Text style={styles.title}>Date: {date}</Text>
//     <Text>Workout: {data[0].weight}</Text>
//     <Text>Sleep: {data[0].sleep}</Text>
//     <Text>Water: {data[0].water}</Text>
//     <Text>Food: {data[0].food}</Text>
//   </View>
// );

const DayLog = ({index, item }) => {
    return (
        <Pressable
            onLongPress={() => {
                console.log("longPress! ", item)
                deleteBodyFuelDataset(item)
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
        // onLongPress={() => {
        //     deleteReminder(item);
        //     Toast.show(`Deleted ${item.text}!`, {
        //         duration: Toast.durations.LONG,
        //         animation: true,
        //         hideOnPress: true,
        //     });
        // }}   
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

    useEffect(() => {
        if(refresh == true){
    
          getBodyFuelWorkoutData((workoutDataFromDB) => {
            setFeedData(dbToArr(workoutDataFromDB))
          });
        }
      }, [refresh]);


  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={feedData}
        renderItem={DayLog}
        keyExtractor={item => item.date}
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