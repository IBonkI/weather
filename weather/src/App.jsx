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
  const [dayForForecast, setDayForForecast] = useState(0);


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
      newCityHistory.splice(indexOfCity, 1)
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
    addCityToHistory(data.city.name)
  }

  const groupForecastByDay = (forecast) => {
    const groupedForecast = [[]]

    let lastDateChecked
    let currentIndex = 0

    forecast.forEach((f) => {
      const dateDay = getDateFromUnix(f.dt).getDate()
      if (!lastDateChecked || lastDateChecked === dateDay) {
        lastDateChecked = dateDay
        groupedForecast[currentIndex].push(f)
        return
      }
      lastDateChecked = dateDay
      groupedForecast.push([f])
      currentIndex++
    })

    return groupedForecast
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
        const groupedForecast = groupForecastByDay(data.list)
        handleSetWeatherData({ ...data, list: groupedForecast })
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
    return new Date(timestamp * 1000)
  }

  const handleClickHistory = (cityName) => {
    setCityQuery(cityName);
    fetchWeatherData(cityName)
  }

  // a and b are javascript Date objects
  function dateDiffInDays(a, b) {
    const _MS_PER_DAY = 1000 * 60 * 60 * 24;
    // Discard the time and time-zone information.
    const utc1 = Date.UTC(a.getFullYear(), a.getMonth(), a.getDate());
    const utc2 = Date.UTC(b.getFullYear(), b.getMonth(), b.getDate());

    return Math.floor((utc2 - utc1) / _MS_PER_DAY);
  }

  const getTimeForecastIndexForMiddle = weatherData && weatherData.list[dayForForecast].length - 1 < 5 ? weatherData.list[dayForForecast].length - 1 : 5

  return (
    <div className="App">
      <form onSubmit={handleSubmit}>
        <input value={cityQuery || ''} onChange={handleChangeInput} />
        <button type="submit">Submit</button>
      </form>
      {weatherData && (
        <>

          {weatherData.list.map((hourlyForecasts, i) => {
            const date = getDateFromUnix(hourlyForecasts[0].dt)
            let weekday = date.toLocaleDateString('de-DE', { weekday: 'long' })

            const dayDiff = dateDiffInDays(date, new Date());

            if (dayDiff === 0) {
              weekday = 'Heute'
            }
            if (dayDiff === -1) {
              weekday = 'Morgen'
            }
            return <button style={dayForForecast === i ? { backgroundColor: 'red' } : {}} onClick={() => setDayForForecast(i)}>{weekday}</button>
          })}

          <h1>{weatherData.city.name}</h1>

          <div style={{
            display: 'flex',
            justifyContent: 'space-between'
          }}>
            <div style={{
              display: 'flex',
              alignItems: 'center'
            }}>
              <img src={getWeatherIcon(weatherData.list[dayForForecast][getTimeForecastIndexForMiddle].weather[0].icon)} />
              <span>{Math.floor(weatherData.list[dayForForecast][getTimeForecastIndexForMiddle].main.temp)}°C</span>
            </div>

            <div style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'flex-end',
            }}>
              <span>Wetter</span>
              <span>{getDateFromUnix(weatherData.list[dayForForecast][getTimeForecastIndexForMiddle].dt).toLocaleDateString('de-DE', { weekday: 'long' })}</span>
              <span>{weatherData.list[dayForForecast][getTimeForecastIndexForMiddle].weather[0].description}</span>
            </div>

          </div>



          <div style={{ display: 'flex', gap: '10px' }}>
            {weatherData.list[dayForForecast].map(forecast => {
              return (
                <div style={{
                  border: 'solid 1px grey', display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center'
                }}>
                  <span>{getDateFromUnix(forecast.dt).toLocaleTimeString('de-DE', { hour: 'numeric', minute: 'numeric' })}</span>
                  {/* TODO: ugly */}
                  <img style={{ margin: '-10px 0' }} src={getWeatherIcon(forecast.weather[0].icon)} />
                  <span style={{ fontWeight: 'bold' }}>{Math.floor(forecast.main.temp)}°</span>
                </div>
              )
            })}
          </div>

        </>
      )}

      {cityHistory.length > 0 && cityHistory.map((c, i) => <span onClick={() => handleClickHistory(c)} key={c + i}>{c} <Star /> </span>)}
      {cityHistory.length > 0 && <XCircle onClick={() => clearHistory()} />
      }
    </div>
  )
}

export default App
