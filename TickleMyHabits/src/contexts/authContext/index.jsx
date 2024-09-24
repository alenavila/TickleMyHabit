import { onAuthStateChanged, signOut } from "firebase/auth"; // signOut hinzufügen
import { auth } from "../../firebase/firebase";
import React, { useContext, useState, useEffect } from "react";

const AuthContext = React.createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setCurrentUser(user); // Keine Notwendigkeit, das User-Objekt zu kopieren
      } else {
        setCurrentUser(null);
      }
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  // Auth-Funktionen, die im gesamten Kontext verwendet werden können
  const value = {
    currentUser,
    userLoggedIn: !!currentUser, // Umwandlung zu booleschem Wert
    signOut: () => signOut(auth), // Hinzufügen der Abmeldefunktion
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children} {/* Zeige nur Kinder, wenn Auth geladen ist */}
    </AuthContext.Provider>
  );
}
