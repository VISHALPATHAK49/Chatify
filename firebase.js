import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyD1Pg9nqFCtmwEdD-mKRa9D20KXv8qNWjU",
    authDomain: "chatify-d5c93.firebaseapp.com",
    projectId: "chatify-d5c93",
    storageBucket: "chatify-d5c93.appspot.com",
    messagingSenderId: "24010168867",
    appId: "1:24010168867:web:1da0e39e3baf0f8970ef96",
    measurementId: "G-GVT430QMQS"
  };
  const app= !firebase.apps.length ? firebase.initializeApp(firebaseConfig):firebase.app();
  const db=app.firestore();
  const auth=app.auth();
  const provider=new firebase.auth.GoogleAuthProvider();

  export{db,auth,provider};