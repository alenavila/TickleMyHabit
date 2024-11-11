import React from 'react';
import Sidebar from '../Components/Hauptseite/Sidebar.jsx';
import HabitManager from '../Components/Hauptseite/HabitManager.jsx';
import { useAuth } from '../contexts/authContext/index'; 

const Hauptseite = () => {
  const { currentUser, signOut } = useAuth();

  return (
    <div className='page-container'>
      <Sidebar /> 
      <div className='main-content'>
        {currentUser ? (
          <div>
            <h1>Willkommen, {currentUser.email} !</h1>
            <p id='slogan'>Gewohnheiten formen dein Leben – fang heute an!</p>
            <HabitManager /> 
          </div>
        ) : (
          <div>
            <h2>Bitte melde dich an</h2>
          </div>
        )}
      </div>
    </div>
  );
};

export default Hauptseite;
