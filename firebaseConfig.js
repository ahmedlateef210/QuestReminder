import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore"

const firebaseConfig = {
  apiKey: "AIzaSyBsQcMHrxtCbiGVbQpH0PMyUkDdZh_f0FY",
  authDomain: "questreminder.firebaseapp.com",
  projectId: "questreminder",
  storageBucket: "questreminder.appspot.com",
  messagingSenderId: "1038950872825",
  appId: "1:1038950872825:web:df7f6d8a6af07462059428",
  measurementId: "G-88TGY2BPYS"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth();
const db = getFirestore();

export {
  auth,
  db
}