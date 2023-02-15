import { useEffect, useState } from 'react'
import './App.css'
const API_URL = `${import.meta.env.VITE_OPEN_WEATHER_API_URL}?lat=48.52961&lon=12.16179&lang=de&appid=${import.meta.env.VITE_OPEN_WEATHER_API_KEY}`
function App() {
  const [weatherData, setWeatherData] = useState();

  useEffect(() => {
    fetch(API_URL).then(res => res.json()).then(data => setWeatherData(data))
  }, [API_URL])

  const getDateFromUnix = (timestamp) => {
    const date = new Date(timestamp * 1000)
   return date.toUTCString()
  } 

  return (
    <div className="App">
      fasdflöajsdfölj
      fasdf
      {weatherData && (
        <>
          <h1>Wetter: {weatherData.weather[0].description}</h1>
          <h2>Icon: <img src={`https://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`}/></h2>
          <h3>Datum: {getDateFromUnix(weatherData.dt)}</h3>
        </>
      )}
    </div>
  )
}

export default App
