import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Firebase-Konfiguration mit Projekt-spezifischen Informationen
const firebaseConfig = {
  apiKey: "AIzaSyDxaTJLZMzDcbWD5VMEcuGLTGa13KCTAro",
  authDomain: "ticklemyhabits.firebaseapp.com",
  projectId: "ticklemyhabits",
  storageBucket: "ticklemyhabits.appspot.com",
  messagingSenderId: "843934485741",
  appId: "1:843934485741:web:e9873d4cdfc555563410e4",
  measurementId: "G-M92TYHK8BE"
};

// Firebase-App initialisieren
const app = initializeApp(firebaseConfig);

// Firebase-Authentifizierungsdienst initialisieren
const auth = getAuth(app);

// Firebase Firestore-Datenbank initialisieren
const db = getFirestore(app);

// Exportieren der App, Authentifizierung und Datenbank zur Verwendung in anderen Modulen
export { app, auth, db };
