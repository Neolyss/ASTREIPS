// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDB3Tei1bmqxeVAg8ajlorHxKeNCT2J-fE",
    authDomain: "astreips.firebaseapp.com",
    projectId: "astreips",
    storageBucket: "astreips.appspot.com",
    messagingSenderId: "984970406021",
    appId: "1:984970406021:web:958c022611cba8d6c4e1ec"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);