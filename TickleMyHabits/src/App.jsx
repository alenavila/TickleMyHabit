import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Startseite from "./pages/Startseite";
import Anmelden from "./pages/Anmelden";
import Registrieren from "./pages/Registrieren";
import Hauptseite from "./pages/Hauptseite"
import { AuthProvider } from './contexts/authContext'; // AuthProvider importieren

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Startseite />} />
          <Route path="/Anmelden" element={<Anmelden />} />
          <Route path="/Registrieren" element={<Registrieren />} />
          <Route path="/Hauptseite" element={<Hauptseite />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
