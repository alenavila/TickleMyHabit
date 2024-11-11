import React from 'react';
import '../../styles/Abmelden.css';
import { doSignOut } from "../../firebase/auth";

const Abmelden = () => {
    // Handler-Funktion für den Logout
    const handleLogout = async () => {
        try {
            // Führt die Abmeldefunktion aus
            await doSignOut();
            console.log("Erfolgreich abgemeldet!");
            // Leitet den Benutzer nach der Abmeldung zur Anmeldeseite weiter
            window.location.href = "/Anmelden";
        } catch (error) {
            // Fehlerbehandlung bei Problemen während der Abmeldung
            console.error("Fehler beim Abmelden: ", error);
        }
    };

    return (
        <div className="bottom-button">
            {/* Button zum Abmelden mit dem Logout-Handler */}
            <button onClick={handleLogout}>Abmelden</button>
        </div>
    );
}

export default Abmelden;
