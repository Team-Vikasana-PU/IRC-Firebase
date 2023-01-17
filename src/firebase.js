// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { collection as fb_collection } from "firebase/firestore";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBMFceUTSax2TKbixjbtso1L8vyfQyheTk",
  authDomain: "irc-web-app.firebaseapp.com",
  projectId: "irc-web-app",
  storageBucket: "irc-web-app.appspot.com",
  messagingSenderId: "215878854430",
  appId: "1:215878854430:web:583cc1f6676f4551834b0f",
  measurementId: "G-CKZR1GG4T1"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
const db = getFirestore(app);
const collection = fb_collection(db, 'participants')
const teams_collection = fb_collection(db, 'teams')
const hotels_collection = fb_collection(db, 'hotel')
const storage = getStorage(app)

export {auth, db, collection, teams_collection, hotels_collection, storage}