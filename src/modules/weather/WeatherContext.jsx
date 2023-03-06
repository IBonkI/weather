import { createContext, useContext, useState } from "react";
import { groupForecastByDay } from "./weather.utils";

const API_URL_CONFIG = `&units=metric&lang=de&appid=${
  import.meta.env.VITE_OPEN_WEATHER_API_KEY
}`;

const getForecastApiUrl = (city) =>
  `${
    import.meta.env.VITE_OPEN_WEATHER_FORECAST_API_URL
  }?q=${city}${API_URL_CONFIG}`;

const getApiUrl = (city) =>
  `${import.meta.env.VITE_OPEN_WEATHER_API_URL}?q=${city}${API_URL_CONFIG}`;

const WeatherContext = createContext();

export const WeatherProvider = ({ children }) => {
  const [weatherData, setWeatherData] = useState();
  const [currentWeatherData, setCurrentWeatherData] = useState();
  const [forecastDay, setForecastDay] = useState(0);

  const fetchWeatherData = (cityName, cb) => {
    let isOk = false;
    cityName &&
      fetch(getForecastApiUrl(cityName.replace(" ", "+")))
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

  const fetchCurrentWeatherData = (cityName, cb) => {
    let isOk = false;
    cityName &&
      fetch(getApiUrl(cityName.replace(" ", "+")))
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
  const context = {
    weatherData,
    currentWeatherData,
    forecastDay,
    setForecastDay,
    fetchWeatherData,
    fetchCurrentWeatherData,
  };

  return (
    <WeatherContext.Provider value={context}>
      {children}
    </WeatherContext.Provider>
  );
};

export const useWeather = () => {
  const ctx = useContext(WeatherContext);

  if (!ctx) {
    throw new Error("Use Context Inside Provider");
  }

  return ctx;
};
