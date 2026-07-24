// <!-- ========================================= -->
// <!----------StatusMessage.jsx — PreviTempo---------->
// <!-- ========================================= -->
// <!----------Autor: Erick Silva | Elarssen Code Solutions------->
// <!-- ========================================= -->
// <!-------------------Versão: 1.0----------------->
// <!-- ========================================= -->

import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { LuLoaderCircle, LuTriangleAlert } from 'react-icons/lu'

function StatusMessage({ title, message, tone = 'loading' }) {
  const Icon = tone === 'error' ? LuTriangleAlert : LuLoaderCircle
  const containerRef = useRef(null)

  useGSAP(
    () => {
      gsap.fromTo(
        containerRef.current,
        { autoAlpha: 0, y: -10 },
        { autoAlpha: 1, y: 0, duration: 0.45, ease: 'power2.out' }
      )
    },
    { scope: containerRef }
  )

  return (
    <div ref={containerRef} className={`status-message status-message--${tone}`} role="status">
      <Icon className={tone === 'loading' ? 'icon-spin' : ''} aria-hidden="true" />
      <div>
        <strong>{title}</strong>
        {message && <span>{message}</span>}
      </div>
    </div>
  )
}

export default StatusMessage