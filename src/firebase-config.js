import { initializeApp } from "firebase/app";
import { getFirestore } from "@firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCUKIzsYYU_s4nkMPySgHD1qX014DSIcsk",
  authDomain: "pokemon-app-ea290.firebaseapp.com",
  databaseURL: "https://pokemon-app-ea290-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "pokemon-app-ea290",
  storageBucket: "pokemon-app-ea290.appspot.com",
  messagingSenderId: "407254779443",
  appId: "1:407254779443:web:e3d5b09f9966a6a4b98546",
  measurementId: "G-T7FPRGSM9V"
};

export const firebase = initializeApp(firebaseConfig);
export const db =  getFirestore(firebase);