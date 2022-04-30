import { initializeApp } from 'firebase/app';
// import { getFirestore, collection, getDocs } from 'firebase/firestore/lite';
import {
  getDatabase,
} from 'firebase/database';
import {
  getAuth,
  onAuthStateChanged
} from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';


const firebaseConfig = {
  apiKey: "AIzaSyBmEyGX9GZmJVk39Ob_Ffrp_BNVWKj9-cY",
  authDomain: "register-4bb22.firebaseapp.com",
  databaseURL: "https://register-4bb22-default-rtdb.firebaseio.com",
  projectId: "register-4bb22",
  storageBucket: "register-4bb22.appspot.com",
  messagingSenderId: "519083895838",
  appId: "1:519083895838:web:8967f3d8f61e0c7d1a120f",
  measurementId: "G-LSWCGMYF0D"
};

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);
const db = getFirestore(app)
const auth = getAuth(app);

let loggedUser: boolean = false;
 onAuthStateChanged(auth, user => {
  if (user !== null) {
    console.log('logged in');

     loggedUser = true;
  } else {
    console.log('No user');
    let loggedUser = false;
  }
})

export { database, auth, loggedUser }