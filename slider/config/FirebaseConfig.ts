// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCxPk7tpxIzLTFXHdJh5GbPni1fxxeqGGE",
  authDomain: "slider-62825.firebaseapp.com",
  projectId: "slider-62825",
  storageBucket: "slider-62825.firebasestorage.app",
  messagingSenderId: "86151421942",
  appId: "1:86151421942:web:7e728e5bc987db4850f1d7",
  measurementId: "G-E957GWKFG2",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export const firebaseDb = getFirestore(app);
