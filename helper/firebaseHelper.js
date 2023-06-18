import { FirebaseApp, initializeApp } from "firebase/app";
import {
  child,
  get,
  getDatabase,
  onValue,
  push,
  ref,
  remove,
} from "firebase/database";

import { firebaseConfig } from "./firebaseConfig";

//let uid = "UAFe0fQZswcPoXX1IBm8GwOQ5MZ2";

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

  storeBodyFuelDataset(key, item) {
    const db = getDatabase();
    const reference = ref(db, `bodyfuel/${this.uid}/workoutData/${key}`);
    push(reference, item);
  }

  deleteBodyFuelDataset(item) {
    const db = getDatabase();
    const reference = ref(db, `bodyfuel/${this.uid}/workoutData/${item.date}`);
    remove(reference);

  }
} 
