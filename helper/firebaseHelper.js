import {getDatabase, onValue, push, ref, remove, set, update} from "firebase/database"

import {initializeApp} from "firebase/app"

const firebaseConfig = {
    apiKey: "AIzaSyC2yhy7uaemOn2lTRB53Ab0NPqjER1EBm0",
    authDomain: "mytodoapp-5652f.firebaseapp.com",
    databaseURL: "https://mytodoapp-5652f-default-rtdb.firebaseio.com",
    projectId: "mytodoapp-5652f",
    storageBucket: "mytodoapp-5652f.appspot.com",
    messagingSenderId: "545585241396",
    appId: "1:545585241396:web:f408d48fb0c3c197915961",
    measurementId: "G-9DJQ8H7B59"
  };

  export function initRemindersDB() {
    initializeApp(firebaseConfig)
  }

//   export function writeData(key, data) {
//     const db = getDatabase();
//     const reference = ref(db, `bodyfuel/${key}`);
//     set(reference, data);
//   }

  export function storeReminderItem(item) {
    const db = getDatabase();
    const reference = ref(db, "bodyfuel/")
    push(reference, item)
  }

  export function setDataLister(key) {
    console.log("setDataListener called");
    const db = getDatabase();
    const reference = ref(db, `bodyfuel/${key}`);
    onValue(reference, (snapshot) => {
        console.log("data listener fires up with: ", snapshot);
    });
  }

  export function setupReminderListener(updateFunc) {
    const db = getDatabase();
    const reference = ref(db, "bodyfuel/");
    onValue( reference, (snapshot) =>{
        console.log("setupReminderListener fires up with: ", snapshot);
        if(snapshot?.val()){
            const fbObject = snapshot.val();
            const newArr = [];
            Object.keys(fbObject).map((key, index) => {
                console.log(key, "||", index, "||", fbObject[key]);
                newArr.push({...fbObject[key], id:key});
            });
            updateFunc(newArr);
        } else {
            updateFunc([]);
        }
    })
  }

  export function updateReminder(item){
    const key = item.id;
    delete item.id;
    const db = getDatabase()
    const reference = ref(db, `bodyfuel/${key}`);
    set(reference, item);
}

export function deleteReminder(item) {
    const db = getDatabase();
    const reference = ref(db, `bodyfuel/${item.id}`);
    remove(reference);
}