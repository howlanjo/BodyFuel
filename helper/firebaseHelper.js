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

setBodyFuelUserData(userInfo){
  const db = getDatabase();
  const reference = ref(db, `bodyfuel/${this.uid}/userInfo`);
  set(ref, userInfo)
  .then(console.log("Updated successfully."))
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
    const db = getDatabase();
    const reference = ref(db, `bodyfuel/${this.uid}/workoutData/${key}`);
    push(reference, item)
    .then(() => {
      console.log("Set wrote successfully")
    })
  }

  deleteBodyFuelDataset(item) {
    const db = getDatabase();
    const reference = ref(db, `bodyfuel/${this.uid}/workoutData/${item.date}`);
    remove(reference);

  }

  initializeDb(uid){
    console.log("initializing database")
    const db = getDatabase();
    const reference = ref(db, `bodyfuel/${uid}/workoutData/00000000`);
    console.log("Before push")
    push(reference, {
      date: 0,
      bench: 0,
      squat: 0,
      deadLift: 0,
      run: 0,
      water: 0,
      food: 0,
      sleep: 0,
    })
    .then(() => {
      console.log("Set wrote successfully")
    })
    console.log("After push")
  }
} 
