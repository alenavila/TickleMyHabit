import React, { useState } from 'react';
import { Navigate, Link } from 'react-router-dom';
import { doCreateUserWithEmailAndPassword } from '../../firebase/auth'; // Funktion zur Registrierung in Firebase
import { useAuth } from '../../contexts/authContext';
import LogoSignUp from "../../assets/logo6.jpg"; // Dein Registrierungslogo oder das gleiche wie bei Login
import '../../styles/Login.css'; // Du kannst ein separates CSS-File für die Registrierung verwenden

const Register = () => {
  const { userLoggedIn } = useAuth();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isSigningUp, setIsSigningUp] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const onSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setErrorMessage('Passwörter stimmen nicht überein.');
      return;
    }

    if (!isSigningUp) {
      setIsSigningUp(true);
      try {
        await doCreateUserWithEmailAndPassword(email, password);
      } catch (error) {
        setErrorMessage(error.message);
      } finally {
        setIsSigningUp(false);
      }
    }
  };

  if (userLoggedIn) {
    return <Navigate to="/Hauptseite" replace={true} />;
  }

  return (
    <div className='login-container'> 
  <main className='login-main'> 
    <div>
      <img src={LogoSignUp} alt='LogoSignUp' className='logoLogIn' /> 
      <div>
        <h3>Registrieren</h3> 
      </div>
    </div>

    <form onSubmit={onSubmit} className='login-form'> 
      <div className='form-group'>
        <label for='email'>Email</label>
        <input
          id='email'
          type='email'
          autoComplete='email'
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div class='form-group'>
        <label for='password'>Passwort</label>
        <input
          id='password'
          type='password'
          autoComplete='new-password'
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <div class='form-group'>
        <label for='confirm-password'>Passwort bestätigen</label>
        <input
          id='confirm-password'
          type='password'
          autoComplete='new-password'
          required
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
      </div>

      {errorMessage && <span className="error-message">{errorMessage}</span>}

      <button type="submit" disabled={isSigningUp} className='fab'>
            {isSigningUp ? 'Registrierung läuft...' : 'Registrieren'}
          </button>
    </form>

    <p>
      Hast du schon einen Account? <a href='/Anmelden'>Anmelden</a> 
    </p>
  </main>
</div>

  );
};

export default Register;
