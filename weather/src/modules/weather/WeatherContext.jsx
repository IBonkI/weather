import { createContext, useContext, useState } from "react"
import { useHistory } from "../search/SearchContext";
import { groupForecastByDay } from "./weather.utils";


const API_URL_CONFIG = `&units=metric&lang=de&appid=${import.meta.env.VITE_OPEN_WEATHER_API_KEY}`

const getApiUrl = (city) => `${import.meta.env.VITE_OPEN_WEATHER_API_URL}?q=${city}${API_URL_CONFIG}`


const WeatherContext = createContext()

export const WeatherProvider = ({ children }) => {
    const [weatherData, setWeatherData] = useState();
    const [forecastDay, setForecastDay] = useState(0);
    const [onFetch, setOnFetch] = useState();
    const { addCityToHistory } = useHistory()

    const onFetchWeatherData = (cb) => {
        setOnFetch(cb)
    }

    // cityName is optional when loading from history
    const fetchWeatherData = (cityName) => {
        // const query = cityName || cityQuery
        const query = cityName
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
                setWeatherData({ ...data, list: groupedForecast })
                // TODO: Think of better way to be more generic
                addCityToHistory(data.city.name)
            })
    }


    const context = {
        weatherData,
        forecastDay,
        setForecastDay,
        fetchWeatherData,
        onFetchWeatherData
    }

    return <WeatherContext.Provider value={context}>{children}</WeatherContext.Provider>
}

export const useWeather = () => {
    const ctx = useContext(WeatherContext)

    if (!ctx) {
        throw new Error('Use Context Inside Provider')
    }

    return ctx
}

