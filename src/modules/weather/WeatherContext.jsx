import { createContext, useContext, useState } from 'react';
import { groupForecastByDay } from './weather.utils';

const API_URL_CONFIG = `&units=metric&lang=de&appid=${import.meta.env.VITE_OPEN_WEATHER_API_KEY}`;

const getForecastApiUrl = (lat, lon, cityName) =>
  `${
    import.meta.env.VITE_OPEN_WEATHER_FORECAST_API_URL
  }?q=${cityName}&lat=${lat}&lon=${lon}${API_URL_CONFIG}`;

const getApiUrl = (lat, lon, cityName) =>
  `${
    import.meta.env.VITE_OPEN_WEATHER_API_URL
  }?q=${cityName}&lat=${lat}&lon=${lon}${API_URL_CONFIG}`;

// Use when wanting to use own State
export const useWeatherState = () => {
  const [weatherData, setWeatherData] = useState();
  const [currentWeatherData, setCurrentWeatherData] = useState();
  const [forecastDay, setForecastDay] = useState(0);

  const fetchWeatherData = (city, cb) => {
    let isOk = false;
    city &&
      fetch(getForecastApiUrl(city.lat, city.lon, city.cityName))
        .then((res) => {
          if (!res.ok) {
            return res.json();
          }

          isOk = true;
          return res.json();
        })
        .then((data) => {
          if (!isOk) {
            return;
          }
          const groupedForecast = groupForecastByDay(data.list);
          setWeatherData({ ...data, list: groupedForecast });
          cb && cb(data);
        });
  };

  const fetchCurrentWeatherData = (city, cb) => {
    let isOk = false;
    city &&
      fetch(getApiUrl(city.lat, city.lon, city.cityName))
        .then((res) => {
          if (!res.ok) {
            return res.json();
          }

          isOk = true;
          return res.json();
        })
        .then((data) => {
          if (!isOk) {
            return;
          }
          setCurrentWeatherData(data);
          cb && cb(data);
        });
  };
  return {
    weatherData,
    currentWeatherData,
    forecastDay,
    setForecastDay,
    fetchWeatherData,
    fetchCurrentWeatherData
  };
};

const WeatherContext = createContext();

export const WeatherProvider = ({ children }) => {
  const context = useWeatherState();
  return <WeatherContext.Provider value={context}>{children}</WeatherContext.Provider>;
};

export const useWeather = () => {
  const ctx = useContext(WeatherContext);

  if (!ctx) {
    throw new Error('Use Context Inside Provider');
  }

  return ctx;
};
