import { getDateFromUnix } from '../utils/date';

export const groupForecastByDay = (forecast) => {
  const groupedForecast = [[]];

  let lastDateChecked;
  let currentIndex = 0;

  forecast.forEach((f) => {
    const dateDay = getDateFromUnix(f.dt).getDate();
    if (!lastDateChecked || lastDateChecked === dateDay) {
      lastDateChecked = dateDay;
      groupedForecast[currentIndex].push(f);
      return;
    }
    lastDateChecked = dateDay;
    groupedForecast.push([f]);
    currentIndex++;
  });

  return groupedForecast;
};

export const getWeatherIcon = (iconName, isBig = false) =>
  `https://openweathermap.org/img/wn/${iconName}@${isBig ? '4x' : '2x'}.png`;

export const getHighestTemperture = (weatherData) => {
  const maxTemps = weatherData.map((w) => w.main.temp_max);
  return Math.max(...maxTemps);
};

export const getLowestTemperture = (weatherData) => {
  const minTemps = weatherData.map((w) => w.main.temp_min);
  return Math.min(...minTemps);
};
