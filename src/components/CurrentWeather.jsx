// <!-- ========================================= -->
// <!----------CurrentWeather.jsx — PreviTempo---------->
// <!-- ========================================= -->
// <!----------Autor: Erick Silva | Elarssen Code Solutions------->
// <!-- ========================================= -->
// <!-------------------Versão: 1.0----------------->
// <!-- ========================================= -->

import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { LuThermometer, LuDroplets, LuWind } from 'react-icons/lu'
import WeatherIcon from '../util/weatherIcons'
import { tempToPercent } from '../util/tempScale'

const GAUGE_RADIUS = 52
const GAUGE_CIRCUMFERENCE = 2 * Math.PI * GAUGE_RADIUS
// O medidor cobre 270° (deixando um vão de 90° na base), como um
// instrumento analógico. O arco preenchido reflete a temperatura
// atual real dentro da escala -10°C a 40°C.
const GAUGE_ARC_FRACTION = 0.75
const GAUGE_TRACK_LENGTH = GAUGE_CIRCUMFERENCE * GAUGE_ARC_FRACTION

function CurrentWeather({ current, location }) {
  const percent = tempToPercent(current.temperature)
  const progressLength = (percent / 100) * GAUGE_TRACK_LENGTH

  const sectionRef = useRef(null)
  const gaugeProgressRef = useRef(null)
  const tempValueRef = useRef(null)

  // Este card é montado do zero a cada nova cidade carregada (App.jsx só
  // o renderiza quando `weather` chega e `isLoading` volta a false), então
  // a timeline abaixo toca automaticamente toda vez que uma busca termina:
  // o painel entra em fade+slide, o medidor "desenha" o arco e o número
  // de temperatura conta a partir de 0 até o valor real.
  useGSAP(
    () => {
      const tl = gsap.timeline({ defaults: { ease: 'power2.out' } })
      const gaugeState = { length: 0 }
      const tempState = { value: 0 }

      tl.fromTo(sectionRef.current, { autoAlpha: 0, y: 18 }, { autoAlpha: 1, y: 0, duration: 0.55 })
        .to(
          gaugeState,
          {
            length: progressLength,
            duration: 1,
            onUpdate: () => {
              gaugeProgressRef.current?.setAttribute(
                'stroke-dasharray',
                `${gaugeState.length} ${GAUGE_CIRCUMFERENCE}`
              )
            },
          },
          '-=0.25'
        )
        .to(
          tempState,
          {
            value: current.temperature,
            duration: 1,
            onUpdate: () => {
              if (tempValueRef.current) {
                tempValueRef.current.textContent = Math.round(tempState.value)
              }
            },
          },
          '<'
        )

      return () => tl.kill()
    },
    { dependencies: [location, current.temperature, current.weatherCode], scope: sectionRef }
  )

  return (
    <section ref={sectionRef} className="current-weather" aria-labelledby="current-weather-title">
      <div className="current-weather__info">
        <p className="eyebrow">Agora em</p>
        <h2 id="current-weather-title">{location}</h2>
        <p className="current-weather__description">{current.description}</p>

        <div className="stat-row">
          <div className="stat-chip">
            <LuThermometer aria-hidden="true" />
            <div>
              <strong>{current.feelsLike}°C</strong>
              <span>Sensação</span>
            </div>
          </div>
          <div className="stat-chip">
            <LuDroplets aria-hidden="true" />
            <div>
              <strong>{current.humidity}%</strong>
              <span>Umidade</span>
            </div>
          </div>
          <div className="stat-chip">
            <LuWind aria-hidden="true" />
            <div>
              <strong>{current.windSpeed} km/h</strong>
              <span>Vento</span>
            </div>
          </div>
        </div>
      </div>

      <div className="current-weather__gauge-wrap">
        <div className="current-weather__gauge">
          <svg
            viewBox="0 0 120 120"
            className="gauge-svg"
            role="img"
            aria-label={`Temperatura atual: ${current.temperature} graus Celsius`}
          >
            <defs>
              <linearGradient id="gaugeGradient" x1="0%" y1="100%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="var(--color-accent-cyan)" />
                <stop offset="55%" stopColor="var(--color-accent-violet)" />
                <stop offset="100%" stopColor="var(--color-accent-amber)" />
              </linearGradient>
            </defs>
            <circle className="gauge-track" cx="60" cy="60" r={GAUGE_RADIUS} />
            <circle
              ref={gaugeProgressRef}
              className="gauge-progress"
              cx="60"
              cy="60"
              r={GAUGE_RADIUS}
              strokeDasharray={`0 ${GAUGE_CIRCUMFERENCE}`}
            />
          </svg>
          <div className="current-weather__icon-badge">
            <WeatherIcon className="current-weather__icon" code={current.weatherCode} />
          </div>
        </div>
        <div className="current-weather__temperature">
          <span ref={tempValueRef}>0</span>
          <sup>°C</sup>
        </div>
      </div>
    </section>
  )
}

export default CurrentWeather