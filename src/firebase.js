// src/firebase.js
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// Tu configuración
const firebaseConfig = {
  apiKey: "AIzaSyDQUfhVZlOscT8NlmS891lheOJcIG-oSF0",
  authDomain: "afganistansochum.firebaseapp.com",
  projectId: "afganistansochum",
  storageBucket: "afganistansochum.firebasestorage.app",
  messagingSenderId: "113939392544",
  appId: "1:113939392544:web:101e3584a2bef888df7445",
  measurementId: "G-2RX5H4W139"
};

// Inicializa Firebase y exporta Firestore
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export default db;
