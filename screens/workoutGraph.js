import {
  Dimensions,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { useEffect, useState } from "react";

import FirebaseContext from "../context/firebaseContext";
import { LineChart } from "react-native-chart-kit";
import { WorkoutDataBase } from "../helper/dataClass";
//import { getBodyFuelWorkoutData } from "../helper/firebaseHelper";
import { organizeRawData } from "../helper/dataOrganization";
import { useContext } from "react";

const WorkoutGraph = (userId) => {
  const {fb} = useContext(FirebaseContext);

  const [weight, setWeight] = useState([0])
  const [weightBackup, setWeightBackup] = useState([]);
  const [water, setWater] = useState([0]);
  const [waterBackup, setWaterBackup] = useState([]);
  const [sleep, setSleep] = useState([0]);
  const [sleepBackup, setSleepBackup] = useState([]);
  const [food, setFood] = useState([0]);
  const [foodBackup, setFoodBackup] = useState([]);

  const [workoutData, setWorkoutData] = useState();
  let userWorkoutData = new WorkoutDataBase();
  const [refresh, setRefresh] = useState(false);

  useEffect(() => {
    setRefresh(true);

  }, []);

  useEffect(() => {
    if(refresh == true){
      console.log("REFRESHED")

      fb.getBodyFuelWorkoutData((workoutDataFromDB) => {

        organizeRawData(workoutDataFromDB, userWorkoutData);
          
        setWeight(userWorkoutData.getWeightData())
        setWater(userWorkoutData.getWaterData())
        setSleep(userWorkoutData.getSleepData())
        setFood(userWorkoutData.getFoodData())
        setRefresh(false)
      });
    }
  }, [refresh]);

  return (
    <View>
      <Pressable
      onPress={() => {
        setRefresh(true);
        console.log("pressed")
      }}
      >
        <LineChart
          data={{
            //labels: days,
            datasets: [
              {
                data: weight,
                strokeWidth: 2,
                color: (opacity = 1) => `rgba(255,0,0,${opacity})`, // optional
              },
              {
                data: sleep,
                strokeWidth: 2,
                color: (opacity = 1) => `rgba(0,0,0, ${opacity})`, // optional
                
              },
              {
                data: food,
                strokeWidth: 2,
                color: (opacity = 1) => `rgba(0,0,255, ${opacity})`, // optional
              },
              {
                data: water,
                strokeWidth: 2,
                color: (opacity = 1) => `rgba(0,255,0, ${opacity})`, // optional
              },
            ],
          }}

          width={Dimensions.get("window").width - 20} // from react-native
          height={400}

          yAxisInterval={1} // optional, defaults to 1
          
          chartConfig={{
            backgroundColor: "#a26a00",
            backgroundGradientFrom: "#fb8c00",
            backgroundGradientTo: "#ffa726",
            decimalPlaces: 2, // optional, defaults to 2dp
            color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
            labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
            style: {
              borderRadius: 16,
            },
            propsForDots: {
              r: "6",
              strokeWidth: "2",
              //stroke: "#ffa726"
            },
          }}

          bezier
          style={{
            marginVertical: 8,
            borderRadius: 16,
          }}
        />
      </Pressable>
      <View style={{ flexDirection: "row", justifyContent: "space-evenly" }}>
        
        <Pressable
          style={[styles.button, {backgroundColor: 'red'}]}
          onPress={() => {
            console.log("weight: ", weight)
            if (weight.length){
              setWeightBackup(weight)
              setWeight([])
            }
            else{
              setWeight(weightBackup)
              setWeightBackup([])
            }
          }}
        >
          <Text style={styles.textStyle}>Workout</Text>
        </Pressable>

        <Pressable
          style={[styles.button, {backgroundColor: 'green'}]}
          onPress={() => {
            console.log("water: ", water)
            if (water.length){
              setWaterBackup(water)
              setWater([])
            }
            else{
              setWater(waterBackup)
              setWaterBackup([])
            }
          }}
        >
          <Text style={styles.textStyle}>Water</Text>
        </Pressable>

        <Pressable
          style={[styles.button, {backgroundColor: 'blue'}]}
          onPress={() => {
            console.log("food: ", food)
            if (food.length){
              setFoodBackup(food)
              setFood([])
            }
            else{
              setFood(foodBackup)
              setFoodBackup([])
            }
          }}
        >
          <Text style={styles.textStyle}>Food</Text>
        </Pressable>

        <Pressable
          style={[styles.button, {backgroundColor: 'black'}]}
          onPress={() => {
            console.log("sleep: ", sleep)
            if (sleep.length){
              setSleepBackup(sleep)
              setSleep([])
            }
            else{
              setSleep(sleepBackup)
              setSleepBackup([])
            }
          }}
        >
          <Text style={styles.textStyle}>Sleep</Text>
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  buttonLabel: {
    backgroundColor: "#3399ff",
    fontSize: 22,
    fontWeight: "bold",
    margin: 5,
    color: "white",
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  textStyle: {
    color: 'white'
  },
});

export default WorkoutGraph;
