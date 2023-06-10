import 'firebase/compat/auth'
import 'firebase/compat/firestore'

import firebase from 'firebase/compat/app'

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

// Initialize Firebase
let app;
if (firebase.apps.length === 0) {
  app = firebase.initializeApp(firebaseConfig);
} else {
  app = firebase.app()
}

const auth = firebase.auth()

export { auth };