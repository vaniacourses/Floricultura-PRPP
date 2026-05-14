// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAbWgPk5Ut-ncIegoePtbOUFxq8CoXBjK0",
  authDomain: "floricultura-prpp.firebaseapp.com",
  projectId: "floricultura-prpp",
  storageBucket: "floricultura-prpp.firebasestorage.app",
  messagingSenderId: "666069676133",
  appId: "1:666069676133:web:087c4f8fc9cd82aa5bd68c",
  measurementId: "G-Q2WQEZ5LFS"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();