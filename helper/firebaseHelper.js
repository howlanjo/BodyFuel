import { FirebaseApp, initializeApp } from "firebase/app";
import {
  child,
  get,
  getDatabase,
  onValue,
  push,
  ref,
  remove,
  set,
} from "firebase/database";

import { firebaseConfig } from "./firebaseConfig";

export class FirebaseClass {

  constructor(uid){
    this.uid = uid
  }

  insertUid(uid){
    this.uid = uid
  }

  initBodyFuelDB() {
    initializeApp(firebaseConfig);
  }

  getBodyFuelUserData(updateFunc){
    const db = getDatabase();
    const reference = ref(db, `bodyfuel/${this.uid}/userInfo`);
    onValue(reference, (snapshot) => {
      const fbObject = snapshot.val();
      updateFunc(fbObject);
      return snapshot;
  });
}

  getBodyFuelWorkoutData(updateFunc) {
    const dbRef = ref(getDatabase());
    get(child(dbRef, `bodyfuel/${this.uid}/workoutData`)).then((snapshot) => {
      console.log("CLASS!! -- setupBodyFuelListener fires up with: ", snapshot);
      if(snapshot?.val()){
        const fbObject = snapshot.val();
        updateFunc(fbObject);
      } else {
          updateFunc({});
      }
    });
  }

  SetupBodyFuelWorkoutDataListner(updateFunc){
    console.log("You are setting up the listener right now")
    const db = getDatabase();
    const reference = ref(db, `bodyfuel/${this.uid}/workoutData`);
    onValue(reference, (snapshot) => {
      console.log("Just inside onValue")
      const fbObject = snapshot.val();
      console.log("Got snapshot")
      updateFunc(fbObject);
      console.log("updated the func")
      return snapshot;
  });
}

  storeBodyFuelDataset(key, item) {
    console.log("key: ", key)
    console.log("item: ", item)
    const db = getDatabase();
    const reference = ref(db, `bodyfuel/${this.uid}/workoutData/${key}`);
    console.log("Before push")
    push(reference, item)
    .then(() => {
      console.log("Set wrote successfully")
    })
    console.log("After push")
  }

  deleteBodyFuelDataset(item) {
    const db = getDatabase();
    const reference = ref(db, `bodyfuel/${this.uid}/workoutData/${item.date}`);
    remove(reference);

  }
} 
