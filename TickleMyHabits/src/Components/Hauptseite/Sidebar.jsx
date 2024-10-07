import React from 'react';
import '../../styles/Sidebar.css';
import HabitErstellen from './HabitErstellen';
import Abmelden from './Abmelden';

const Sidebar = () => {
  return (
    <div className='containerSidebar'>
      <div className='logoHauptseite'>
        <img src="../../src/assets/logo6.jpg" alt="Logo" />
      </div>
     <HabitErstellen/>
      <Abmelden/>
    </div>
  );
}

export default Sidebar;
