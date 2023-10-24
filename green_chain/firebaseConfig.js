// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage, ref, uploadBytes } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCpm1VxqKZJIXatwt7-vj1iFCG_LcuuXeg",
  authDomain: "greenchain-6346b.firebaseapp.com",
  projectId: "greenchain-6346b",
  storageBucket: "greenchain-6346b.appspot.com",
  messagingSenderId: "398696985131",
  appId: "1:398696985131:web:1036ae67542b6ffa01b06e"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
export const storage = getStorage(app);