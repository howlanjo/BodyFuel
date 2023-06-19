import { WorkoutDataBase } from "./dataClass";

export function organizeRawData(dbData, userWorkoutClass, numDays) {
  const dates = Object.keys(dbData);

  for (const item of dates){
    console.log("Sending Data: ", dbData[item])
    userWorkoutClass.insertData(dbData[item], item)
  } 
}

export function pad(num, size) {
  num = num.toString();
  while (num.length < size) num = "0" + num;
  return num;
}
