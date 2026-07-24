// <!-- ========================================= -->
// <!----------weatherIcons.jsx — PreviTempo---------->
// <!-- ========================================= -->
// <!----------Autor: Erick Silva | Elarssen Code Solutions------->
// <!-- ========================================= -->
// <!-------------------Versão: 1.0----------------->
// <!-- ========================================= -->

import {WiDaySunny, WiDayCloudy, WiCloudy, WiFog, WiRain, WiShowers, WiThunderstorm, WiSnow} from 'react-icons/wi'

const iconByWeatherCode = {
  0: WiDaySunny,
  1: WiDayCloudy,
  2: WiDayCloudy,
  3: WiCloudy,
  45: WiFog,
  48: WiFog,
  51: WiRain,
  53: WiRain,
  55: WiRain,
  61: WiRain,
  63: WiRain,
  65: WiRain,
  71: WiSnow,
  73: WiSnow,
  75: WiSnow,
  80: WiShowers,
  81: WiShowers,
  82: WiShowers,
  95: WiThunderstorm,
  96: WiThunderstorm,
  99: WiThunderstorm,
}

function WeatherIcon({ code, className }) {
  const Icon = iconByWeatherCode[code] ?? WiCloudy

  return <Icon className={className} aria-hidden="true" />
}

export default WeatherIcon