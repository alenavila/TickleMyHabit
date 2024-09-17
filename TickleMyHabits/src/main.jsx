import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import Startseite from './Components/Startseite/Startseite.jsx'
import './index.css'



createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Startseite />
  </StrictMode>,
)
