import React from 'react'
import './Navbar.css'



const Navbar = () => {
 

  return (
    <nav className='container'>
      <a href="/"><img src='./src/assets/logo5.jpg' alt="Logo"  className='logo'/></a>
      <ul>
        <li>
          <a href="/Registrieren">Registrieren</a>
        </li>
        <li>
          <a href="/Anmelden">
            <button className="fab" >Anmelden</button> </a>  
        </li>
      </ul>
    </nav>
  )
}


export default Navbar
