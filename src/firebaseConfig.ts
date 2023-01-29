import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyAOW4IyIxssTaFjMGFikKiVJdc9gIMXmCY",
    authDomain: "tvmaze-app-57f32.firebaseapp.com",
    databaseURL: "https://tvmaze-app-57f32-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "tvmaze-app-57f32",
    storageBucket: "tvmaze-app-57f32.appspot.com",
    messagingSenderId: "153285338638",
    appId: "1:153285338638:web:6b089c0ddb826eb07bfe5f"
  };
// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
// Initialize Realtime Database and get a reference to the service
export const database = getDatabase(app);