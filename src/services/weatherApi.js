// <!-- ========================================= -->
// <!----------weatherApi.js — PreviTempo---------->
// <!-- ========================================= -->
// <!----------Autor: Erick Silva | Elarssen Code Solutions------->
// <!-- ========================================= -->
// <!-------------------Versão: 1.0----------------->
// <!-- ========================================= -->

const GEOCODING_URL = 'https://geocoding-api.open-meteo.com/v1/search'
const FORECAST_URL = 'https://api.open-meteo.com/v1/forecast'

const weatherDescriptions = {
  0: 'Céu limpo',
  1: 'Principalmente limpo',
  2: 'Parcialmente nublado',
  3: 'Nublado',
  45: 'Neblina',
  48: 'Neblina com gelo',
  51: 'Garoa leve',
  53: 'Garoa moderada',
  55: 'Garoa intensa',
  61: 'Chuva leve',
  63: 'Chuva moderada',
  65: 'Chuva forte',
  71: 'Neve leve',
  73: 'Neve moderada',
  75: 'Neve forte',
  80: 'Pancadas leves',
  81: 'Pancadas moderadas',
  82: 'Pancadas fortes',
  95: 'Trovoadas',
  96: 'Trovoadas com granizo',
  99: 'Trovoadas fortes',
}

function getWeatherDescription(code) {
  return weatherDescriptions[code] ?? 'Condicao desconhecida'
}

function formatLocation(location) {
  const region = location.admin1 ? `${location.admin1}, ` : ''
  const country = location.country ? ` - ${location.country}` : ''

  return `${location.name}, ${region}${location.country_code}${country}`
}

function buildForecastUrl(location) {
  const params = new URLSearchParams({
    latitude: location.latitude,
    longitude: location.longitude,
    current:
      'temperature_2m,relative_humidity_2m,apparent_temperature,weather_code,wind_speed_10m',
    daily: 'weather_code,temperature_2m_max,temperature_2m_min',
    timezone: 'auto',
    forecast_days: '5',
  })

  return `${FORECAST_URL}?${params.toString()}`
}

function normalizeWeatherData(location, forecast) {
  const daily = forecast.daily.time.map((date, index) => ({
    date,
    weatherCode: forecast.daily.weather_code[index],
    description: getWeatherDescription(forecast.daily.weather_code[index]),
    maxTemperature: Math.round(forecast.daily.temperature_2m_max[index]),
    minTemperature: Math.round(forecast.daily.temperature_2m_min[index]),
  }))

  return {
    location: formatLocation(location),
    current: {
      temperature: Math.round(forecast.current.temperature_2m),
      feelsLike: Math.round(forecast.current.apparent_temperature),
      humidity: forecast.current.relative_humidity_2m,
      windSpeed: Math.round(forecast.current.wind_speed_10m),
      weatherCode: forecast.current.weather_code,
      description: getWeatherDescription(forecast.current.weather_code),
    },
    daily,
  }
}

export async function getWeatherByCity(city) {
  const searchParams = new URLSearchParams({
    name: city,
    count: '1',
    language: 'pt',
    format: 'json',
  })

  const geocodingResponse = await fetch(`${GEOCODING_URL}?${searchParams.toString()}`)

  if (!geocodingResponse.ok) {
    throw new Error('Nao foi possivel buscar a cidade.')
  }

  const geocodingData = await geocodingResponse.json()
  const [location] = geocodingData.results ?? []

  if (!location) {
    throw new Error('Cidade nao encontrada. Tente buscar por outro nome.')
  }

  const forecastResponse = await fetch(buildForecastUrl(location))

  if (!forecastResponse.ok) {
    throw new Error('Nao foi possivel carregar a previsao do tempo.')
  }

  const forecastData = await forecastResponse.json()

  return normalizeWeatherData(location, forecastData)
}
