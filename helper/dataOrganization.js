import { WorkoutDataBase } from "./dataClass";

export function organizeRawData(dbData, userWorkoutClass) {
  console.log("organizeRawData");

  const dates = Object.keys(dbData);
  const entr = Object.values(dbData);
  const weightArr = [];

  //console.log("dates length: ", dates.length)

  for (const item of dates){
    userWorkoutClass.insertData(dbData[item], item)
  } 
  
  // for (const item of entr) {
  //   weightArr.push(parseFloat(item[Object.keys(item)[0]].weight));
  //   //console.log("item: ", item[Object.keys(item)[0]]);
  // }

  //console.log("weightArr: ", weightArr);
}

export function pad(num, size) {
  num = num.toString();
  while (num.length < size) num = "0" + num;
  return num;
}
