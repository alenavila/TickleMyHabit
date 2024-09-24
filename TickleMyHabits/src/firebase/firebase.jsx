import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth"

const firebaseConfig = {
  apiKey: "AIzaSyDxaTJLZMzDcbWD5VMEcuGLTGa13KCTAro",
  authDomain: "ticklemyhabits.firebaseapp.com",
  projectId: "ticklemyhabits",
  storageBucket: "ticklemyhabits.appspot.com",
  messagingSenderId: "843934485741",
  appId: "1:843934485741:web:e9873d4cdfc555563410e4",
  measurementId: "G-M92TYHK8BE"
};


const app = initializeApp(firebaseConfig);
const auth = getAuth(app)

export { app, auth }