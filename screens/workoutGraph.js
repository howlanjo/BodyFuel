import {
  BarChart,
  ContributionGraph,
  LineChart,
  PieChart,
  ProgressChart,
  StackedBarChart,
} from "react-native-chart-kit";
import {
  Dimensions,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useEffect, useState } from "react";

import { WorkoutDataBase } from "../helper/dataClass";
import { organizeRawData } from "../helper/dataOrganization";
import { setupBodyFuelListener } from "../helper/firebaseHelper";

const WorkoutGraph = (userId) => {
  const [weight, setWeight] = useState([1,1,1,1,1])
  const [weightBackup, setWeightBackup] = useState([]);
  const [water, setWater] = useState([2,2,2,2,2]);
  const [sleep, setSleep] = useState([3,3,3,3,3]);
  const [food, setFood] = useState([4,4,4,4,4]);
  const [workoutData, setWorkoutData] = useState();
  let userWorkoutData = new WorkoutDataBase();

  useEffect(() => {
    console.log("userId: ", userId)
    if(userId){
      setupBodyFuelListener((workoutDataFromDB) => {
      console.log("workoutDataFromDB: ", workoutDataFromDB)
      w = organizeRawData(workoutDataFromDB, userWorkoutData);

      console.log("userWorkoutData: ", userWorkoutData.getWeightData())

      setWeight(userWorkoutData.getWeightData())
      setWater(userWorkoutData.getWaterData())
      setSleep(userWorkoutData.getSleepData())
      setFood(userWorkoutData.getFoodData())

      });
    }
  }, [userId]);

  return (
    <View>
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
              color: (opacity = 1) => `rgba(0,0,102, ${opacity})`, // optional
              
            },
            {
              data: food,
              strokeWidth: 2,
              color: (opacity = 1) => `rgba(0,102,0, ${opacity})`, // optional
            },
          ],
        }}
        width={Dimensions.get("window").width - 20} // from react-native
        height={400}
        //yAxisLabel="$"
        //yAxisSuffix="k"
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
      <View style={{ flexDirection: "row", justifyContent: "space-evenly" }}>
        <Pressable
          style={[styles.button, styles.buttonOpen]}
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
          <Text style={styles.textStyle}>Sleep</Text>
        </Pressable>

        <Pressable
          style={[styles.button, styles.buttonOpen]}
          onPress={() => {
            console.log("Water Pressed");
          }}
        >
          <Text style={styles.textStyle}>Water</Text>
        </Pressable>

        <Pressable
          style={[styles.button, styles.buttonOpen]}
          onPress={() => {
            console.log("Food Pressed");
          }}
        >
          <Text style={styles.textStyle}>Food</Text>
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
});

export default WorkoutGraph;
