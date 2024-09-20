import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Startseite from "./pages/Startseite";
import Anmelden from "./pages/Anmelden";
import Registrieren from "./pages/Registrieren";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Startseite />} />
        <Route path="/anmelden" element={<Anmelden />} />
        <Route path="/registrieren" element={<Registrieren />} />
      </Routes>
    </Router>
  );
}

export default App;

    
