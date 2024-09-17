import React from 'react'
import './Navbar.css'



const Navbar = () => {
 

  return (
    <nav className='container'>
      <img src='./src/assets/logo5.jpg' alt="Logo"  className='logo'/>
      <ul>
        <li>Registrieren</li>
        <li>
            <button className="fab" >Anmelden</button></li>
      </ul>
    </nav>
  )
}


export default Navbar
