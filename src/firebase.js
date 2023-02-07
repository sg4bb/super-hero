import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyAcgUNQzMBmgGo4Jn9Rx_mldhoyCs8dm7U",
  authDomain: "prueba-9cb20.firebaseapp.com",
  projectId: "prueba-9cb20",
  storageBucket: "prueba-9cb20.appspot.com",
  messagingSenderId: "1083694672465",
  appId: "1:1083694672465:web:5829e84be12e16fb796670"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };
