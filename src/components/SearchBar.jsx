// <!-- ========================================= -->
// <!----------SearchBar.jsx — PreviTempo---------->
// <!-- ========================================= -->
// <!----------Autor: Erick Silva | Elarssen Code Solutions------->
// <!-- ========================================= -->
// <!-------------------Versão: 1.0----------------->
// <!-- ========================================= -->

import { useRef, useState } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { LuSearch, LuLoaderCircle } from 'react-icons/lu'

function SearchBar({ onSearch, isLoading }) {
  const [city, setCity] = useState('')
  const controlsRef = useRef(null)
  const buttonRef = useRef(null)

  // Enquanto uma busca está em andamento, a moldura do campo pulsa
  // suavemente; a animação some sozinha assim que isLoading vira false.
  useGSAP(
    () => {
      if (!isLoading) return

      gsap.to(controlsRef.current, {
        boxShadow: '0 0 0 6px rgba(94, 234, 212, 0.16)',
        duration: 0.9,
        ease: 'sine.inOut',
        repeat: -1,
        yoyo: true,
      })
    },
    { dependencies: [isLoading], scope: controlsRef }
  )

  function handleSubmit(event) {
    event.preventDefault()

    const trimmedCity = city.trim()

    if (!trimmedCity) return

    gsap.fromTo(
      buttonRef.current,
      { scale: 1 },
      { scale: 0.94, duration: 0.12, yoyo: true, repeat: 1, ease: 'power1.inOut' }
    )

    onSearch(trimmedCity)
    setCity('')
  }

  return (
    <form className="search-bar" onSubmit={handleSubmit}>
      <label className="search-bar__label" htmlFor="city">
        Buscar cidade
      </label>
      <div className="search-bar__controls" ref={controlsRef}>
        <input
          id="city"
          type="search"
          value={city}
          onChange={(event) => setCity(event.target.value)}
          placeholder="Ex: São Paulo, Londres..."
          disabled={isLoading}
          autoComplete="off"
        />
        <button ref={buttonRef} type="submit" disabled={isLoading || !city.trim()}>
          {isLoading ? (
            <LuLoaderCircle className="icon-spin" aria-hidden="true" />
          ) : (
            <LuSearch aria-hidden="true" />
          )}
          <span>{isLoading ? 'Buscando' : 'Buscar'}</span>
        </button>
      </div>
    </form>
  )
}

export default SearchBar