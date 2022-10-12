// Import the functions you need from the SDKs you need
import * as firebase from "firebase";
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA4IVoS7zvdl6FKgqhWz1GcLUbznauztc0",
  authDomain: "applogin-805f0.firebaseapp.com",
  projectId: "applogin-805f0",
  storageBucket: "applogin-805f0.appspot.com",
  messagingSenderId: "1052384786565",
  appId: "1:1052384786565:web:ad9edf3393433731a1d1ec"
};
console.log(firebaseConfig);

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };