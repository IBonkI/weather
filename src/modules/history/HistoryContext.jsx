import { createContext, useContext, useEffect, useState } from 'react';
import { useWeatherState } from '../weather/WeatherContext';
import { deserializeCityHistory, serializedCityHistory } from './utils';

const HistoryContext = createContext();

export const HistoryProvider = ({ children }) => {
  const [cityHistory, setCityHistory] = useState([]);
  const { fetchCurrentWeatherData } = useWeatherState();

  const clearHistory = () => {
    setCityHistory([]);
    localStorage.removeItem('cityHistory');
  };

  useEffect(() => {
    const parsedHistory = JSON.parse(localStorage.getItem('cityHistory'));
    if (!parsedHistory) {
      return;
    }
    parsedHistory.forEach((h) => {
      const { lat, lon, cityName } = deserializeCityHistory(h);
      fetchCurrentWeatherData({ lat, lon, cityName }, (data) => {
        addCityToHistory(data);
      });
    });
  }, []);

  const addCityToHistory = (city) => {
    const newCityHistory = cityHistory;
    const indexOfCity = newCityHistory.map((cH) => cH.name).indexOf(city.name);

    if (indexOfCity > -1) {
      newCityHistory.splice(indexOfCity, 1);
    }

    newCityHistory.push(city);

    setCityHistory(newCityHistory);

    const serializedCityHistoryHistory = newCityHistory.map((cH) =>
      serializedCityHistory(cH.coord.lat, cH.coord.lon, cH.name)
    );
    localStorage.setItem('cityHistory', JSON.stringify(serializedCityHistoryHistory));
  };

  const context = {
    addCityToHistory,
    cityHistory,
    clearHistory
  };

  return <HistoryContext.Provider value={context}>{children}</HistoryContext.Provider>;
};

export const useHistory = () => {
  const ctx = useContext(HistoryContext);

  if (!ctx) {
    throw new Error('Use Context Inside Provider');
  }

  return ctx;
};
