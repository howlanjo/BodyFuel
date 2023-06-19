import { createContext, useContext, useState } from "react";

import FirebaseContext from "./firebaseContext";
import { WorkoutDataBase } from "../helper/dataClass";
import { organizeRawData } from "../helper/dataOrganization";

const WorkoutDataContext = createContext();

export function WorkoutDataProvider({children}) {
    const {fb} = useContext(FirebaseContext);
    const workoutData = new WorkoutDataBase();
    const [alert, setAlert] = useState(false);
    const [bench, setBench] = useState([0])
    const [squat, setSquat] = useState([0])
    const [deadLift, setDeadLift] = useState([0])
    const [run, setRun] = useState([0])
    const [water, setWater] = useState([0]);
    const [sleep, setSleep] = useState([0]);
    const [food, setFood] = useState([0]);
    const [dbExport, setDbExport] = useState([0]);
    console.log("-----------Up here--------------")

    const setupDbListener = () => {
        fb.SetupBodyFuelWorkoutDataListner((workoutDataFromDB) => {
            setDbExport(workoutDataFromDB);
            workoutData.clearData()
            organizeRawData(workoutDataFromDB, workoutData, 7);

            console.log("Setting bench to: ", workoutData.getBenchData())
            console.log("Setting squat to: ", workoutData.getSquatData())
            console.log("Setting deadlift to: ", workoutData.getDeadLiftData())
            console.log("Setting run to: ", workoutData.getRunData())

            setBench(workoutData.getBenchData())
            setSquat(workoutData.getSquatData())
            setDeadLift(workoutData.getDeadLiftData())
            setRun(workoutData.getRunData())
    
            setWater(workoutData.getWaterData())
            setSleep(workoutData.getSleepData())
            setFood(workoutData.getFoodData())
            setAlert(true)
        });
    }
    
    return (
        <WorkoutDataContext.Provider value={{alert, setupDbListener, water, sleep, food, bench, squat, deadLift, run, dbExport}}>{children}</WorkoutDataContext.Provider>
    );
}

export default WorkoutDataContext;