// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDfKTOFmQl8rrQy2pTUVD3QcxmDAnlcV3o",
  authDomain: "course-reactjs.firebaseapp.com",
  projectId: "course-reactjs",
  storageBucket: "course-reactjs.appspot.com",
  messagingSenderId: "346323656127",
  appId: "1:346323656127:web:bcba86ff2bdd9adfa4950a",
  measurementId: "G-QM3WESS20X"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
const db = getFirestore(app);
const auth = getAuth(app);

export { db, auth }