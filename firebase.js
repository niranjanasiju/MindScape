// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore, doc, setDoc } from "firebase/firestore";
import { getStorage } from "firebase/storage"; // Correct import for Firebase Storage
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBG1aN4wfMP-PBk7nUCjTPOocp9-yVuuo0",
  authDomain: "mindscape-7cf5d.firebaseapp.com",
  projectId: "mindscape-7cf5d",
  storageBucket: "mindscape-7cf5d.firebasestorage.app",
  messagingSenderId: "556075329529",
  appId: "1:556075329529:web:6aff5193e352991edaff28",
  measurementId: "G-ME1J5FDTCN"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();
const storage = getStorage(app); 

export { db, auth, provider, doc, setDoc, storage };