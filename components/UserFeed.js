import {
  FlatList,
  Modal,
  Pressable,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { useEffect, useState } from 'react';

import DetailedLog from './DetailedLog';
import FirebaseContext from '../context/firebaseContext';
import React from 'react';
import WorkoutDataContext from '../context/workoutContext';
import { useContext } from 'react';

function formatDate(date){
  return date.slice(0,2)+"."+date.slice(2,4)+"."+date.slice(4)
}

const DayLog = ({item}) => {
  const [open, setOpen] = useState(false);  
  
    return (
        <Pressable
            onLongPress={() => {
                console.log("longPress! ", item)
                //fb.deleteBodyFuelDataset(item)
            }}
            onPress={() => {
              console.log("Popup Here")
              setOpen(true);
              console.log(open)

            }}
        >
        <View style={styles.item}>
            <Text style={styles.title}>{formatDate(item.date)}</Text>
            <View style={{flexDirection: 'row', justifyContent: 'space-evenly'}}>
              <Text style={{color:(item.bench > 0) ? 'green' : 'red', fontSize: 18}}>Bench</Text>
              <Text style={{color:(item.squat > 0) ? 'green' : 'red', fontSize: 18}}>Squat</Text>
              <Text style={{color:(item.deadLift > 0) ? 'green' : 'red', fontSize: 18}}>Deadlift</Text>
              <Text style={{color:(item.run > 0) ? 'green' : 'red', fontSize: 18}}>Run</Text>
            </View>
            <View style={{flexDirection: 'row', justifyContent: 'space-evenly'}}>
              <Text style={{color:(item.sleep > 0) ? 'green' : 'red', fontSize: 18}}>Sleep</Text>
              <Text style={{color:(item.water > 0) ? 'green' : 'red', fontSize: 18}}>Water</Text>
              <Text style={{color:(item.food > 2) ? 'green' : 'red', fontSize: 18}}>Food</Text> 
              </View>
        </View>
        <Modal animationType="slide"
          transparent={true}
          visible={open}
          onRequestClose={() => {
            Alert.alert("Modal has been closed.");
            setModalVisible(!modalVisible);
          }}
          > 
            <DetailedLog item={item} open={setOpen}/>
        </Modal>
        </Pressable>  
)};

const dbToArr = (inDB) => {
    keys = Object.keys(inDB)
    let aaa = []
    for (item of keys){
        aaa.push({date: item, bench: inDB[item].getBenchData()})
    }

    return aaa.reverse();
} 

const classToArray = (woClass) => {
  console.log("woClass: ", woClass);
  
  let aaa = []
  for (item of woClass.dataByDate){
    console.log("woClass[item]: ", item);
      aaa.push({date: item.date, 
        bench: Math.max(...item.bench),
        squat: Math.max(...item.squat),
        deadLift: Math.max(...item.deadLift),
        run: Math.max(...item.run),
        sleep: item.sleep,
        water: item.water,
        food: item.food,
        })
  }

  return aaa.reverse();
}

const UserFeed = () => {
    const [feedData, setFeedData] = useState([]);
    const {fb} = useContext(FirebaseContext);
    const {dbExport, workoutData} = useContext(WorkoutDataContext);
    

    useEffect(() => {
      setFeedData(classToArray(dbExport));          
      }, []);


  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={feedData}
        renderItem={({ item }) => <DayLog item={item}/>}
        keyExtractor={item => item.date }
      />
      {/* <DetailedLog open={open} onClose={()=> setOpen(false)}/> */}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
  },
  centeredView: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
  },
  item: {
    backgroundColor: "#ffa726",
    padding: 20,
    marginVertical: 4,
    marginHorizontal: 16,
    borderRadius: 25
  },
  title: {
    fontSize: 18,
  },
});

export default UserFeed;