import { useState, useCallback, useEffect } from 'react'
import { Star, XCircle } from 'react-bootstrap-icons'
import { CitySearch } from '../modules/search/CitySearch'
import { CitySearchHistory } from '../modules/search/CitySearchHistory'
import { useHistory } from '../modules/search/SearchContext'
import { CurrentWeather } from '../modules/weather/CurrentWeather'
import { DailyWeather } from '../modules/weather/DailyWeather'
import { HourlyWeather } from '../modules/weather/HourlyWeather'
import { useWeather } from '../modules/weather/WeatherContext'



export const WeatherForecast = () => {
    const { fetchWeatherData, weatherData } = useWeather()


    return (
        <div className="App" style={{ flex: 1 }}>
            <CitySearch onSubmit={fetchWeatherData} />
            {weatherData && (
                <>

                    <DailyWeather />

                    <CurrentWeather />

                    <HourlyWeather />

                </>
            )}
            <CitySearchHistory onClick={fetchWeatherData} />
        </div>
    )
}

