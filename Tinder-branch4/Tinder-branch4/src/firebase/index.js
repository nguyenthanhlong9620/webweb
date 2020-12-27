import firebase from "firebase/app"
import "firebase/storage";
import "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyDV11QUlUoP96ZuW46w3mxyxxzhEAR_aIs",
    authDomain: "tinder-da0ff.firebaseapp.com",
    projectId: "tinder-da0ff",
    storageBucket: "tinder-da0ff.appspot.com",
    messagingSenderId: "314724104864",
    appId: "1:314724104864:web:c1f621ddef9ccc126167c5",
    measurementId: "G-HZ42V8FL59"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  const storage = firebase.storage();
  const firestore = firebase.firestore();

  export {storage, firestore , firebase as default};