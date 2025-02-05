// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
const firebaseConfig = {
  apiKey: "AIzaSyD2mQZTBqbgaWxeltYpDWmoCbdFhT4Grmg",
  authDomain: "ticket-a10ad.firebaseapp.com",
  projectId: "ticket-a10ad",
  storageBucket: "ticket-a10ad.firebasestorage.app",
  messagingSenderId: "360366010636",
  appId: "1:360366010636:web:de10c71a2e016f7b5f9929"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);