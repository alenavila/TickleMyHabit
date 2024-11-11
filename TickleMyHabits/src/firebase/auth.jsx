import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { auth } from "./firebase";

// Funktion zur Erstellung eines neuen Benutzers mit E-Mail und Passwort
export const doCreateUserWithEmailAndPassword = async (email, password) =>  {
    return createUserWithEmailAndPassword(auth, email, password);
};

// Funktion zur Anmeldung eines Benutzers mit E-Mail und Passwort
export const doSignInWithEmailAndPassword = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
};

// Funktion zur Abmeldung des Benutzers
export const doSignOut = () => {
    return signOut(auth);
}
