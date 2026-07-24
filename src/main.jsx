// <!-- ========================================= -->
// <!----------main.jsx — PreviTempo---------->
// <!-- ========================================= -->
// <!----------Autor: Erick Silva | Elarssen Code Solutions------->
// <!-- ========================================= -->
// <!-------------------Versão: 1.0----------------->
// <!-- ========================================= -->

import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import './index.css'
import App from './App.jsx'

gsap.registerPlugin(useGSAP)

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)