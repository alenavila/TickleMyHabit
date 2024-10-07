import React, { useState } from 'react';
import { Navigate, Link } from 'react-router-dom';
import { doSignInWithEmailAndPassword } from '../../firebase/auth'; 
import { useAuth } from '../../contexts/authContext';
import LogoLogIn from "../../assets/logo6.jpg";
import '../../styles/Login.css';


const Login = () => {
  const { userLoggedIn } = useAuth();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSigningIn, setIsSigningIn] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const onSubmit = async (e) => {
    e.preventDefault();
    if (!isSigningIn) {
      setIsSigningIn(true);
      try {
        await doSignInWithEmailAndPassword(email, password);
      } catch (error) {
        setErrorMessage(error.message);
      } finally {
        setIsSigningIn(false);
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
        <img src={LogoLogIn} alt="LogoLogIn" className='logoLogIn' />
        <div>
          <h3>Willkommen zurück</h3>
        </div>
      </div>
  
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
  
        {errorMessage && <span className="error-message">{errorMessage}</span>}
  
        <button type="submit" disabled={isSigningIn} className='fab'>
          {isSigningIn ? 'Anmeldung folgt...' : 'Anmelden'}
        </button>
      </form>
 
      <p>
        Kein Account? <Link to="/Registrieren">Registrieren</Link>
      </p>
      
    </main>
  </div>
  
  );
};

export default Login;
