import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Paste your Firebase config object here
const firebaseConfig = {
  apiKey: "AIzaSyDgBxsQuNbspg5viVkDvaxyEoN2h7d9edE", // Replace with your actual API key
  authDomain: "fundraising-dashboard-c7c07.firebaseapp.com",
  projectId: "fundraising-dashboard-c7c07",
  storageBucket: "fundraising-dashboard-c7c07.firebasestorage.app",
  messagingSenderId: "470709060945",
  appId: "1:470709060945:web:fdf56521b192d05a047f70",
  measurementId: "G-HZDQZZPKWG"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };





