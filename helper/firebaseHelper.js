import {FirebaseApp, initializeApp} from "firebase/app"
import {getDatabase, onValue, push, ref, remove, set, update,} from "firebase/database"

import { firebaseConfig } from "./firebaseConfig";

let uid = "UAFe0fQZswcPoXX1IBm8GwOQ5MZ2"

export function initBodyFuelDB() {
  initializeApp(firebaseConfig)
}

export function writeData(key, data) {
  const db = getDatabase();
  const reference = ref(db, `bodyfuel/howlanjo/${key}`);
  set(reference, data);
}

export function storeBodyFuelItem(item) {
  const db = getDatabase();
  const reference = ref(db, "bodyfuel/howlanjo/")
  push(reference, item)
}

export function storeBodyFuelUser(item) {
  const db = getDatabase();
  const reference = ref(db, "bodyfuel/howlanjo/")
  push(reference, item)
}

export function storeBodyFuelDataset(key, item) {
  const db = getDatabase();
  const reference = ref(db, `bodyfuel/howlanjo/workoutData/${key}`)
  push(reference, item)
}

export function setDataLister(key) {
  console.log("setDataListener called");
  const db = getDatabase();
  const reference = ref(db, `bodyfuel/howlanjo/${key}`);
  onValue(reference, (snapshot) => {
    console.log("data listener fires up with: ", snapshot);
  });
}

export function setupBodyFuelListener(updateFunc) {
  console.log("uid: ", uid)
  const db = getDatabase();
  const reference = ref(db, `bodyfuel/${uid}`);
  onValue( reference, (snapshot) =>{
    console.log("setupBodyFuelListener fires up with: ", snapshot);

    if(snapshot?.val()){
      const fbObject = snapshot.val();
      const newArr = [];

      Object.keys(fbObject).map((key, index) => {
          newArr.push({...fbObject[key], id:key});
      });
      updateFunc(newArr);
      return snapshot
    } else {
      updateBodyFuelUserData(
        {id: uid, userInfo: {
        username: 'howlanjo', 
        password: 'password', 
        firstName: "John", 
        lastName: "Howland", 
        bio: "This is the bio", 
        gender: "This is the gender"}})
      updateFunc([]);
    }
  })
}


export function updateBodyFuelDataset(item){
  const key = item.date;
  //delete item.date;
  const db = getDatabase()
  const reference = ref(db, `bodyfuel/${uid}/workoutData${key}`);
  set(reference, item);
}

export function updateBodyFuelUserData(item){
  const key = item.id;
  delete item.id
  const db = getDatabase()
  const reference = ref(db, `bodyfuel/${key}`);
  set(reference, item);
}

export function deleteBodyFuelDataset(item) {
  const db = getDatabase();
  const reference = ref(db, `bodyfuel/${uid}/workoutData/${item.date}`);
  remove(reference);
}