// <!-- ========================================= -->
// <!----------ForecastCard.jsx — PreviTempo---------->
// <!-- ========================================= -->
// <!----------Autor: Erick Silva | Elarssen Code Solutions------->
// <!-- ========================================= -->
// <!-------------------Versão: 1.0----------------->
// <!-- ========================================= -->

import WeatherIcon from '../util/weatherIcons'
import { tempToPercent } from '../util/tempScale'

function formatWeekday(date) {
  return new Intl.DateTimeFormat('pt-BR', {
    weekday: 'short',
    day: '2-digit',
    month: '2-digit',
  }).format(new Date(`${date}T12:00:00`))
}

function ForecastCard({ forecast }) {
  const minPercent = tempToPercent(forecast.minTemperature)
  const maxPercent = tempToPercent(forecast.maxTemperature)

  return (
    <article className="forecast-card">
      <div className="forecast-card__header">
        <h3>{formatWeekday(forecast.date)}</h3>
        <WeatherIcon className="forecast-card__icon" code={forecast.weatherCode} />
      </div>

      <p>{forecast.description}</p>

      <div
        className="forecast-card__range"
        role="img"
        aria-label={`Amplitude do dia: de ${forecast.minTemperature} a ${forecast.maxTemperature} graus, na escala de -10 a 40 graus`}
      >
        <span className="forecast-card__range-dim" style={{ width: `${minPercent}%` }} />
        <span
          className="forecast-card__range-dim forecast-card__range-dim--end"
          style={{ width: `${100 - maxPercent}%` }}
        />
      </div>

      <div className="forecast-card__temperatures">
        <strong>{forecast.maxTemperature}°</strong>
        <span>{forecast.minTemperature}°</span>
      </div>
    </article>
  )
}

export default ForecastCard
