// <!-- ========================================= -->
// <!----------ForecastList.jsx — PreviTempo---------->
// <!-- ========================================= -->
// <!----------Autor: Erick Silva | Elarssen Code Solutions------->
// <!-- ========================================= -->
// <!-------------------Versão: 1.0----------------->
// <!-- ========================================= -->

import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import ForecastCard from './ForecastCard'

function ForecastList({ forecast }) {
  const gridRef = useRef(null)

  // Assim como o card principal, esta lista é remontada a cada nova
  // busca bem-sucedida, então os cards entram em cascata (stagger)
  // toda vez que uma nova cidade termina de carregar.
  useGSAP(
    () => {
      gsap.fromTo(
        gridRef.current.children,
        { autoAlpha: 0, y: 22 },
        { autoAlpha: 1, y: 0, duration: 0.5, ease: 'power2.out', stagger: 0.08, delay: 0.15 }
      )
    },
    { dependencies: [forecast], scope: gridRef }
  )

  return (
    <section className="forecast" aria-labelledby="forecast-title">
      <div className="section-heading">
        <div>
          <p className="eyebrow">Próximos dias</p>
          <h2 id="forecast-title">Previsão estendida</h2>
        </div>
        <div className="forecast__scale-legend" aria-hidden="true">
          <span>-10°C</span>
          <span className="legend-bar" />
          <span>40°C</span>
        </div>
      </div>

      <div className="forecast__grid" ref={gridRef}>
        {forecast.map((day) => (
          <ForecastCard key={day.date} forecast={day} />
        ))}
      </div>
    </section>
  )
}

export default ForecastList