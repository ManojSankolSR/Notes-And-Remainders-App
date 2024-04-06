// Import the functions you need from the SDKs you need
import { initializeApp, } from "firebase/app";
import { getAuth, } from 'firebase/auth'
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDeCrBqZy0eLS4XCV-etZt3GPxwLRnjN8w",
  authDomain: "reactnotes-b6c6f.firebaseapp.com",
  projectId: "reactnotes-b6c6f",
  storageBucket: "reactnotes-b6c6f.appspot.com",
  messagingSenderId: "902133055884",
  appId: "1:902133055884:web:42b54de9db9d7ef99bd6a9"
};


const app = initializeApp(firebaseConfig);

const auth=getAuth(app)
const db=getFirestore(app);

export {auth,db};