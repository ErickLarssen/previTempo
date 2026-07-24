// <!-- ========================================= -->
// <!----------useWeather.js — PreviTempo---------->
// <!-- ========================================= -->
// <!----------Autor: Erick Silva | Elarssen Code Solutions------->
// <!-- ========================================= -->
// <!-------------------Versão: 1.0----------------->
// <!-- ========================================= -->

import { useEffect, useState } from 'react'
import { getWeatherByCity } from '../services/weatherApi'

export function useWeather(defaultCity) {
  const [weather, setWeather] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState('')

  async function loadWeather(city) {
    try {
      setIsLoading(true)
      setError('')

      const data = await getWeatherByCity(city)

      setWeather(data)
    } catch (error) {
      setWeather(null)
      setError(error.message)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    let isActive = true

    getWeatherByCity(defaultCity)
      .then((data) => {
        if (isActive) {
          setWeather(data)
        }
      })
      .catch((error) => {
        if (isActive) {
          setError(error.message)
        }
      })
      .finally(() => {
        if (isActive) {
          setIsLoading(false)
        }
      })

    return () => {
      isActive = false
    }
  }, [defaultCity])

  return {
    weather,
    isLoading,
    error,
    loadWeather,
  }
}