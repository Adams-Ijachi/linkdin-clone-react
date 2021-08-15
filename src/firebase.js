import Firebase from 'firebase';


// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyCOlTQl_PQwOqnTvEiXo0tDjXFs3giS3l8",
    authDomain: "linked-in-practice.firebaseapp.com",
    projectId: "linked-in-practice",
    storageBucket: "linked-in-practice.appspot.com",
    messagingSenderId: "315339087247",
    appId: "1:315339087247:web:6527affab9d17c51843ffa",
    measurementId: "G-840LS98P5R"
  };

const firebaseApp = Firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
const auth = firebaseApp.auth();

export { db , auth} ;