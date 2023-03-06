import { Col, Row } from 'react-bootstrap';
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
    <div>
      <h1>{weatherData.city.name}</h1>
      <Row>
        <Col sm>
          <img src={getWeatherIcon(weatherSelector.weather[0].icon)} />
        </Col>
        <Col sm>
          <span>
            {Math.floor(weatherSelector.main.temp)}
            °C
          </span>
        </Col>
      </Row>

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
    </div>
  );
};
