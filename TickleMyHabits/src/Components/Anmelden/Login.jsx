import React, { useState } from 'react';
import { Navigate, Link } from 'react-router-dom';
import { doSignInWithEmailAndPassword } from '../../firebase/auth'; 
import { useAuth } from '../../contexts/authContext';
import LogoLogIn from "../../assets/logo6.jpg";
import '../../styles/Login.css';

const Login = () => {
  // Überprüft, ob der Benutzer eingeloggt ist
  const { userLoggedIn } = useAuth();

  // Definiert Zustände für E-Mail, Passwort, Anmeldeprozess und Fehlernachrichten
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSigningIn, setIsSigningIn] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  // Funktion zur Handhabung des Formulars beim Absenden
  const onSubmit = async (e) => {
    e.preventDefault();
    if (!isSigningIn) { // Verhindert doppelte Anmeldeversuche
      setIsSigningIn(true);
      try {
        // Versucht die Anmeldung mit E-Mail und Passwort
        await doSignInWithEmailAndPassword(email, password);
      } catch (error) {
        // Setzt eine Fehlermeldung, falls die Anmeldung fehlschlägt
        setErrorMessage(error.message);
      } finally {
        // Setzt den Anmeldeprozess-Status zurück
        setIsSigningIn(false);
      }
    }
  };

  // Leitet zum Hauptseite weiter, wenn der Benutzer eingeloggt ist
  if (userLoggedIn) {
    return <Navigate to="/Hauptseite" replace={true} />;
  }

  return (
    <div className='login-container'>
      <main className='login-main'>
        <div>
          {/* Logo-Anzeige */}
          <img src={LogoLogIn} alt="LogoLogIn" className='logoLogIn' />
          <div>
            <h3>Willkommen zurück</h3>
          </div>
        </div>

        {/* Formular zur Eingabe von E-Mail und Passwort */}
        <form onSubmit={onSubmit} className='login-form'>
          <div className='form-group'>
            <label>Email</label>
            <input
              id="email"
              type="email"
              autoComplete="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className='form-group'>
            <label>Passwort</label>
            <input
              id="password"
              type="password"
              autoComplete="current-password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          {/* Fehlernachricht anzeigen, falls vorhanden */}
          {errorMessage && <span className="error-message">{errorMessage}</span>}

          {/* Anmelde-Button mit dynamischem Text basierend auf Anmelde-Status */}
          <button type="submit" disabled={isSigningIn} className='fab'>
            {isSigningIn ? 'Anmeldung folgt...' : 'Anmelden'}
          </button>
        </form>

        {/* Link zur Registrierung, falls der Benutzer noch kein Konto hat */}
        <p>
          Kein Account? <Link to="/Registrieren">Registrieren</Link>
        </p>
      </main>
    </div>
  );
};

export default Login;
