import { HBox, VBox } from '../../components/layout';
import { getDateFromUnix } from '../utils/date';
import { getWeatherIcon } from './weather.utils';
import { useWeather } from './WeatherContext';

export const CurrentWeather = () => {
  const { weatherData, forecastDay, currentWeatherData } = useWeather();

  const getTimeForecastIndexForMiddle =
    weatherData && weatherData.list[forecastDay].length - 1 < 5
      ? weatherData.list[forecastDay].length - 1
      : 5;

  const isToday = forecastDay === 0;

  const weatherSelector = isToday
    ? currentWeatherData
    : weatherData.list[forecastDay][getTimeForecastIndexForMiddle];

  if (!weatherData || !currentWeatherData) {
    return <></>;
  }

  return (
    <VBox styles={{ width: '100%', marginTop: '100px' }}>
      <h1>{weatherData.city.name}</h1>

      <HBox
        styles={{
          justifyContent: 'space-between',
          margin: '40px 250px',
          padding: '20px 100px',
          background: 'rgba(255, 255, 255, 0.03)'
        }}>
        <div>
          <img src={getWeatherIcon(weatherSelector.weather[0].icon)} />

          <span>
            {Math.floor(weatherSelector.main.temp)}
            °C
          </span>
        </div>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between'
          }}>
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'flex-end'
            }}>
            <span>Wetter</span>
            <span>
              {getDateFromUnix(weatherSelector.dt).toLocaleDateString('de-DE', {
                weekday: 'long',
                hour: 'numeric'
              })}
            </span>
            <span>{weatherSelector.weather[0].description}</span>
          </div>
        </div>
      </HBox>
    </VBox>
  );
};
