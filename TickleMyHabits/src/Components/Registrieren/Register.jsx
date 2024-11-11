import React, { useState } from 'react';
import { Navigate, Link } from 'react-router-dom';
import { doCreateUserWithEmailAndPassword } from '../../firebase/auth'; 
import { useAuth } from '../../contexts/authContext';
import LogoSignUp from "../../assets/logo6.jpg"; 
import '../../styles/Login.css'; 

const Register = () => {
  const { userLoggedIn } = useAuth(); // Überprüft, ob der Benutzer bereits eingeloggt ist

  // Zustände für Formularfelder und Fehlermeldungen
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isSigningUp, setIsSigningUp] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  // Funktion zur Handhabung des Registrierungsformulars
  const onSubmit = async (e) => {
    e.preventDefault();

    // Überprüfen, ob Passwort und Bestätigungspasswort übereinstimmen
    if (password !== confirmPassword) {
      setErrorMessage('Passwörter stimmen nicht überein.');
      return;
    }

    // Registrierung ausführen, wenn kein anderer Registrierungsprozess läuft
    if (!isSigningUp) {
      setIsSigningUp(true);
      try {
        await doCreateUserWithEmailAndPassword(email, password); // Benutzer in Firebase erstellen
      } catch (error) {
        // Fehlernachricht setzen, wenn die Registrierung fehlschlägt
        setErrorMessage(error.message);
      } finally {
        // Den Registrierungsprozess-Status zurücksetzen
        setIsSigningUp(false);
      }
    }
  };

  // Weiterleitung zur Hauptseite, wenn der Benutzer eingeloggt ist
  if (userLoggedIn) {
    return <Navigate to="/Hauptseite" replace={true} />;
  }

  return (
    <div className='login-container'> 
      <main className='login-main'> 
        <div>
          {/* Logo anzeigen */}
          <img src={LogoSignUp} alt='LogoSignUp' className='logoLogIn' /> 
          <div>
            <h3>Registrieren</h3> 
          </div>
        </div>

        {/* Registrierungsformular */}
        <form onSubmit={onSubmit} className='login-form'> 
          <div className='form-group'>
            <label htmlFor='email'>Email</label>
            <input
              id='email'
              type='email'
              autoComplete='email'
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className='form-group'>
            <label htmlFor='password'>Passwort</label>
            <input
              id='password'
              type='password'
              autoComplete='new-password'
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className='form-group'>
            <label htmlFor='confirm-password'>Passwort bestätigen</label>
            <input
              id='confirm-password'
              type='password'
              autoComplete='new-password'
              required
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>

          {/* Fehlernachricht anzeigen, falls vorhanden */}
          {errorMessage && <span className="error-message">{errorMessage}</span>}

          {/* Registrierungsbutton mit dynamischem Text basierend auf Registrierungsstatus */}
          <button type="submit" disabled={isSigningUp} className='fab'>
            {isSigningUp ? 'Registrierung läuft...' : 'Registrieren'}
          </button>
        </form>

        {/* Link zur Anmeldeseite, falls Benutzer schon registriert ist */}
        <p>
          Hast du schon einen Account? <Link to='/Anmelden'>Anmelden</Link>
        </p>
      </main>
    </div>
  );
};

export default Register;
