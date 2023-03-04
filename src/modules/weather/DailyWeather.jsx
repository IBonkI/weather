import React from 'react'
import { dateDiffInDays, getDateFromUnix } from '../utils/date'
import { useWeather } from './WeatherContext'

export const DailyWeather = () => {
    const { weatherData, setForecastDay, forecastDay } = useWeather()
    return (
        <>
            {
                weatherData.list.map((hourlyForecasts, i) => {
                    const date = getDateFromUnix(hourlyForecasts[0].dt)
                    let weekday = date.toLocaleDateString('de-DE', { weekday: "long" })

                    const dayDiff = dateDiffInDays(date, new Date());

                    if (dayDiff === 0) {
                        weekday = 'Heute'
                    }
                    if (dayDiff === -1) {
                        weekday = 'Morgen'
                    }
                    return <button key={i} style={forecastDay === i ? { backgroundColor: 'red' } : {}} onClick={() => setForecastDay(i)}>{weekday}</button>
                })
            }
        </>

    )
}
