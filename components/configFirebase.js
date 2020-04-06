import * as firebase from "firebase";


const firebaseConfig = {
    apiKey: "AIzaSyAWBt9PrtUFVSGZgql5cvTMH5bfo-Wo_IY",
    authDomain: "shopp-app-dfc15.firebaseapp.com",
    databaseURL: "https://shopp-app-dfc15.firebaseio.com",
    projectId: "shopp-app-dfc15",
    storageBucket: "shopp-app-dfc15.appspot.com",
    messagingSenderId: "347996241201",
    appId: "1:347996241201:web:166055001276c04a5bc410",
    measurementId: "G-TY69CHPV04"
  };
  // Initialize Firebase

 export const firebaseApp =  firebase.initializeApp(firebaseConfig);
