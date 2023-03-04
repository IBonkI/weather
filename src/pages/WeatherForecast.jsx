import { CitySearch } from '../modules/search/CitySearch'
import { CitySearchHistory } from '../modules/search/CitySearchHistory'
import { useHistory } from '../modules/search/SearchContext'
import { CurrentWeather } from '../modules/weather/CurrentWeather'
import { DailyWeather } from '../modules/weather/DailyWeather'
import { HourlyWeather } from '../modules/weather/HourlyWeather'
import { useWeather } from '../modules/weather/WeatherContext'



export const WeatherForecast = () => {
    const { fetchWeatherData, weatherData } = useWeather()

    const { addCityToHistory } = useHistory()

    const fetchAndAddToHistory = (cityName) => {
        fetchWeatherData(cityName, (data) => {
            addCityToHistory(data.city.name)
        })
    }

    return (
        <div className="App" style={{ flex: 1 }}>
            <CitySearch onSubmit={fetchAndAddToHistory} />
            {weatherData && (
                <>

                    <DailyWeather />

                    <CurrentWeather />

                    <HourlyWeather />

                </>
            )}
            <CitySearchHistory onClick={fetchAndAddToHistory} />
        </div>
    )
}

