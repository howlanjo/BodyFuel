import { createContext, useState } from "react";

import { WorkoutDataBase } from "../helper/dataClass";

const WorkoutDataContext = createContext();

export function WorkoutDataProvider({children}) {
    let workoutData = new WorkoutDataBase();

    const refreshWorkoutData = () => {

    }
    
    return (
        <WorkoutDataContext.Provider value={{workoutData}}>{children}</WorkoutDataContext.Provider>
    );
}

export default WorkoutDataContext;