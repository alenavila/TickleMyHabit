import React from 'react';
import '../../styles/Abmelden.css';
import { doSignOut } from "../../firebase/auth";

const Abmelden = () => {
    // Handler-Funktion für den Logout
    const handleLogout = async () => {
        try {
            await doSignOut(); // Rufe die Abmeldefunktion auf
            console.log("Erfolgreich abgemeldet!");
            window.location.href = "/Anmelden"; // Umleitung zur Anmeldung
        } catch (error) {
            console.error("Fehler beim Abmelden: ", error);
        }
    };

    return (
        <div className="bottom-button">
            <button onClick={handleLogout}>Abmelden</button>
        </div>
    );
}

export default Abmelden;
