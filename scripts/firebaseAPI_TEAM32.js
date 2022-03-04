//----------------------------------------
//  Your web app's Firebase configuration
//----------------------------------------
var firebaseConfig = {
    apiKey: "AIzaSyCQAaAgI2NlOMfL6k_FDScU2yeJFYyUTPs",
    authDomain: "bbyteam32.firebaseapp.com",
    projectId: "bbyteam32",
    storageBucket: "bbyteam32.appspot.com",
    messagingSenderId: "614834369624",
    appId: "1:614834369624:web:6d55af2a0d1cf16cbb862d"
  };

//--------------------------------------------
// initialize the Firebase app
// initialize Firestore database if using it
//--------------------------------------------
const app = firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();