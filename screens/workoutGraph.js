import {
    BarChart,
    ContributionGraph,
    LineChart,
    PieChart,
    ProgressChart,
    StackedBarChart
} from "react-native-chart-kit";
import { Dimensions, Pressable, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useEffect, useState } from "react";

const WorkoutGraph = (inData) => {
    
    const [weight, setWeight] = useState([]);

    useEffect(() => {
        console.log("WORKOUT DATA: ", inData.data)    
        setWeight(inData)

    });


    return (
        
    <View>
        <LineChart
            data={{
            //labels: days,
            datasets: [
                {
                    data: [1, 7, 6, 4, 2, 5],
                    strokeWidth: 2,
                    color: (opacity = 1) => `rgba(255,0,0,${opacity})`, // optional
                },
                {
                    data: [2, 4, 6, 8, 8, 2],
                    strokeWidth: 2,
                    color: (opacity = 1) => `rgba(0,0,102, ${opacity})`, // optional
                },
                {
                    data: [9, 4, 7, 8, 2, 4],
                    strokeWidth: 2,
                    color: (opacity = 1) => `rgba(0,102,0, ${opacity})`, // optional
                },
            ],
            }}
            width={Dimensions.get("window").width-20} // from react-native
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
                borderRadius: 16
            },
            propsForDots: {
                r: "6",
                strokeWidth: "2",
                //stroke: "#ffa726"
            }
            }}
            bezier
            style={{
            marginVertical: 8,
            borderRadius: 16
            }}
        />
        <View style={{flexDirection: 'row', justifyContent: 'space-evenly'}}>
            <Pressable
                style={[styles.button, styles.buttonOpen]}
                onPress={
                    () => {console.log("Sleep Pressed")
                }
                }>
                <Text style={styles.textStyle}>Sleep</Text>
            </Pressable>

            <Pressable
                style={[styles.button, styles.buttonOpen]}
                onPress={
                    () => {console.log("Water Pressed")
                }
                }>
                <Text style={styles.textStyle}>Water</Text>
            </Pressable>

            <Pressable
                style={[styles.button, styles.buttonOpen]}
                onPress={
                    () => {console.log("Food Pressed")
                }
                }>
                <Text style={styles.textStyle}>Food</Text>
            </Pressable>
        </View>
    </View>
    )
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
    }, 
    buttonLabel: {
        backgroundColor: '#3399ff',
        fontSize: 22,
        fontWeight: 'bold',
        margin: 5,
        color: 'white',
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
        backgroundColor: '#F194FF',
      },
});

export default WorkoutGraph;