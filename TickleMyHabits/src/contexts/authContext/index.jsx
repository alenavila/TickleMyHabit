import { onAuthStateChanged, signOut } from "firebase/auth"; 
import { auth } from "../../firebase/firebase";
import React, { useContext, useState, useEffect } from "react";

const AuthContext = React.createContext();

// Custom Hook zur Nutzung des Auth-Kontexts
export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null); // Zustand für den aktuellen Benutzer
  const [loading, setLoading] = useState(true); // Zustand, um den Ladezustand zu verfolgen

  useEffect(() => {
    // Überprüft Authentifizierungsstatus bei jeder Änderung
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setCurrentUser(user); // Setzt den aktuellen Benutzer, falls eingeloggt
      } else {
        setCurrentUser(null); // Setzt auf null, falls nicht eingeloggt
      }
      setLoading(false); // Beendet den Ladezustand
    });

    return unsubscribe; // Aufräumen bei unmounting
  }, []);

  // Auth-Funktionen und Werte, die im gesamten Kontext verfügbar sind
  const value = {
    currentUser,
    userLoggedIn: !!currentUser, // Konvertiert `currentUser` zu einem booleschen Wert
    signOut: () => signOut(auth), // Abmeldefunktion zum Ausloggen des Benutzers
  };

  return (
    <AuthContext.Provider value={value}>
      {/* Rendert die Kinder nur, wenn das Auth-Status-Loading abgeschlossen ist */}
      {!loading && children}
    </AuthContext.Provider>
  );
}
