// <!-- ========================================= -->
// <!----------App.jsx — PreviTempo---------->
// <!-- ========================================= -->
// <!----------Autor: Erick Silva | Elarssen Code Solutions------->
// <!-- ========================================= -->
// <!-------------------Versão: 1.0----------------->
// <!-- ========================================= -->

import Logo from './components/Logo'
import SearchBar from './components/SearchBar'
import CurrentWeather from './components/CurrentWeather'
import ForecastList from './components/ForecastList'
import StatusMessage from './components/StatusMessage'
import './App.css'

import { useWeather } from './hook/useWeather'

const DEFAULT_CITY = 'São Paulo'

function formatToday() {
  const formatted = new Intl.DateTimeFormat('pt-BR', {
    weekday: 'long',
    day: '2-digit',
    month: 'long',
  }).format(new Date())

  return formatted.charAt(0).toUpperCase() + formatted.slice(1)
}

function App() {

  const { weather, isLoading, error, loadWeather } = useWeather(DEFAULT_CITY)

  return (
    <main className="app">
      <section className="dashboard">
        <div className="dashboard__topbar">
          <span className="brand">
            <Logo className="brand__icon" aria-hidden="true" />
            PreviTempo
          </span>
          <p className="dashboard__date">{formatToday()}</p>
        </div>

        <header className="dashboard__header">
          <div>
            <p className="eyebrow">Previsão em tempo real</p>
            <h1>Descubra a previsão do tempo na sua cidade</h1>
          </div>
          <SearchBar onSearch={loadWeather} isLoading={isLoading} />
        </header>

        {isLoading && (
          <StatusMessage
            tone="loading"
            title="Carregando previsão"
            message="Buscando dados atualizados para a cidade selecionada."
          />
        )}

        {error && <StatusMessage tone="error" title="Ops, algo deu errado" message={error} />}

        {weather && !isLoading && (
          <div className="dashboard__content">
            <CurrentWeather current={weather.current} location={weather.location} />
            <ForecastList forecast={weather.daily} />
          </div>
        )}

        <footer>
          <p>&copy; Erick Silva Dev</p>
        </footer>

      </section>
    </main>
  )
}

export default App
