import { Dimensions, StyleSheet, Text, View } from "react-native";

import DropDownPicker from "react-native-dropdown-picker";
import { LineChart } from "react-native-chart-kit";
import WorkoutDataContext from "../context/workoutContext";
import { useContext } from "react";
import { useState } from "react";

const WorkoutGraph = (userId) => {
  const { water, sleep, food, bench, squat, deadLift, run, labels } =
    useContext(WorkoutDataContext);

  const [open, setOpen] = useState(false);
  const [workoutList, setWorkoutList] = useState([
    { label: "Bench", value: 1 },
    { label: "Squat", value: 2 },
    { label: "DeadLift", value: 3 },
    { label: "Run", value: 4 },
  ]);
  const [selectedWorkout, setSelectedWorkout] = useState(1);

  const getWorkoutData = () => {
    console.log("dropdown picker callback");
    switch (selectedWorkout) {
      case 1:
        console.log("Case 1");
        return bench;
      case 2:
        console.log("Case 2");
        return squat;
      case 3:
        console.log("Case 3");
        return deadLift;
      case 4:
        console.log("Case 4");
        return run;

      default:
        return [0];
    }
  };

  return (
    <View>
      <LineChart
        data={{
          labels: labels,
          datasets: [
            {
              data: getWorkoutData(),
              strokeWidth: 2,
              color: (opacity = 1) => `rgba(255,0,0,${opacity})`, // optional
            },
          ],
        }}
        
        width={Dimensions.get("window").width - 20} // from react-native
        height={(Dimensions.get("window").height/3)} 
        yAxisInterval={1} // optional, defaults to 1
        chartConfig={{
          backgroundColor: "#a26a00",
          backgroundGradientFrom: "#fb8c00",
          backgroundGradientTo: "#ffa726",
          decimalPlaces: 1, // optional, defaults to 2dp
          color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
          labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
          style: {
            borderRadius: 16,
          },
          propsForDots: {
            r: "6",
          },
          propsForLabels:{fontSize: 15},
        }}
        bezier
        style={{
          marginVertical: 8,
          borderRadius: 16,
        }}
      />
      <LineChart
        data={{
          labels: labels,
          datasets: [
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
          
          legend: ["Sleep (hr)", "Food", "Water (oz)"] // optional
        }}
        width={Dimensions.get("window").width - 20} // from react-native
        height={(Dimensions.get("window").height/3)} 
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
          },
          propsForLabels:{fontSize: 15},
        }}
        bezier
        style={{
          marginVertical: 8,
          borderRadius: 16,
        }}
      />

      <View style={{ flexDirection: "row", justifyContent: "space-evenly" }}>
        <View style={{ width: Dimensions.get("window").width / 3 }}>
          <DropDownPicker
            style={{ backgroundColor: "#grey" }}
            open={open}
            value={selectedWorkout}
            items={workoutList}
            setOpen={setOpen}
            setValue={setSelectedWorkout}
            setItems={setWorkoutList}
          />
        </View>
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
    color: "white",
  },
});

export default WorkoutGraph;
