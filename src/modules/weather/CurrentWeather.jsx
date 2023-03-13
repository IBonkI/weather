import { HBox, VBox } from '../../components/layout';
import { getDateFromUnix } from '../utils/date';
import { getWeatherIcon } from './weather.utils';
import { useWeather } from './WeatherContext';

export const CurrentWeather = () => {
  const { currentWeatherData } = useWeather();

  if (!currentWeatherData) {
    return <></>;
  }

  return (
    <VBox styles={{ width: '100%', marginTop: '100px' }}>
      <h1>{currentWeatherData.name}</h1>

      <HBox
        styles={{
          justifyContent: 'space-between',
          margin: '40px 150px',
          padding: '20px 100px',
          border: 'solid 1px rgb(170, 139, 86)',
          borderRadius: '6px',
          background: 'rgba(255, 255, 255, 0.03)'
        }}>
        <div>
          <img src={getWeatherIcon(currentWeatherData.weather[0].icon, true)} alt="" />

          <span style={{ fontSize: '24px', fontWeight: 'bold' }}>
            {Math.floor(currentWeatherData.main.temp)}
            °C
          </span>
        </div>

        <VBox
          styles={{
            paddingTop: '20px',
            alignItems: 'flex-end'
          }}>
          <span style={{ fontSize: '21px', fontWeight: 'bold' }}>Wetter</span>
          <span style={{ fontSize: '18px' }}>
            {getDateFromUnix(currentWeatherData.dt).toLocaleDateString('de-DE', {
              weekday: 'long',
              hour: 'numeric'
            })}
          </span>
          <span style={{ fontSize: '18px' }}>{currentWeatherData.weather[0].description}</span>
        </VBox>
      </HBox>
    </VBox>
  );
};
