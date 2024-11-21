// src/utils/firebase.ts
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from 'firebase/auth';

const firebaseConfig = {
    apiKey: "AIzaSyD2UzR9BULZo0wcR7hTVm0DUyjbawAZeHY",
    authDomain: "vue-firebase-2e934.firebaseapp.com",
    projectId: "vue-firebase-2e934",
    storageBucket: "vue-firebase-2e934.firebasestorage.app",
    messagingSenderId: "201721177479",
    appId: "1:201721177479:web:dfdfc83348422296669f22"
};

const firebase = initializeApp(firebaseConfig);
const auth = getAuth(firebase);
const googleProvider = new GoogleAuthProvider();

export { auth, googleProvider };