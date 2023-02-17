import { useState, useCallback, useEffect } from 'react'
import { Star, XCircle } from 'react-bootstrap-icons'
import './App.css'

const API_URL_CONFIG = `&units=metric&lang=de&appid=${import.meta.env.VITE_OPEN_WEATHER_API_KEY}`

const getApiUrl = (city) => `${import.meta.env.VITE_OPEN_WEATHER_API_URL}?q=${city}${API_URL_CONFIG}`

const getWeatherIcon = (iconName) => `https://openweathermap.org/img/wn/${iconName}@2x.png`


function App() {
  const [weatherData, setWeatherData] = useState();
  const [cityQuery, setCityQuery] = useState('');
  const [cityHistory, setCityHistory] = useState([]);


  useEffect(() => {
    const parsedHistory = JSON.parse(localStorage.getItem('cityHistory'));
    if (!parsedHistory) {
      return
    }
    setCityHistory(parsedHistory)
  }, [])

  const addCityToHistory = (cityName) => {
    const newCityHistory = cityHistory
    const indexOfCity = newCityHistory.indexOf(cityName)

    if (indexOfCity > -1) {
      delete newCityHistory[indexOfCity]
    }

    newCityHistory.push(cityName)

    setCityHistory(newCityHistory)
    console.log()
    localStorage.setItem('cityHistory', JSON.stringify(newCityHistory))
  }

  const clearHistory = () => {
    setCityHistory([]);
    localStorage.removeItem('cityHistory')
  }

  const handleSetWeatherData = (data) => {
    if (!data) {
      return;
    }
    setWeatherData(data)
    addCityToHistory(data.name)
  }

  // cityName is optional when loading from history
  const fetchWeatherData = (cityName) => {
    const query = cityName || cityQuery
    console.log(query)
    let isOk = false
    query && fetch(getApiUrl(query.replace(' ', '+')))
      .then(res => {
        if (!res.ok) {
          return res.json()
        }

        isOk = true
        return res.json()
      })
      .then(data => {
        if (!isOk) {
          return;
        }

        handleSetWeatherData(data)
      })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    fetchWeatherData()
  }



  const handleChangeInput = (e) => {
    setCityQuery(e.target.value)
  }

  const getDateFromUnix = (timestamp) => {
    const date = new Date(timestamp * 1000)
    return date.toUTCString()
  }

  const handleClickHistory = (cityName) => {
    setCityQuery(cityName);
    fetchWeatherData(cityName)
  }

  return (
    <div className="App">
      <form onSubmit={handleSubmit}>
        <input value={cityQuery || ''} onChange={handleChangeInput} />
        <button type="submit">Submit</button>
      </form>
      {weatherData && (
        <>
          <h1>{weatherData.name}</h1>
          <h1>Wetter: {weatherData.weather[0].description}</h1>
          <h2>Icon: <img src={getWeatherIcon(weatherData.weather[0].icon)} /></h2>
          <h2>Temperatur: {Math.floor(weatherData.main.temp)}°C</h2>
          <h3>Datum: {getDateFromUnix(weatherData.dt)}</h3>
        </>
      )}

      {cityHistory.length > 0 && cityHistory.map((c, i) => <span onClick={() => handleClickHistory(c)} key={c + i}>{c} <Star /> </span>)}
      {cityHistory.length > 0 && <XCircle onClick={() => clearHistory()} />
      }
    </div>
  )
}

export default App
