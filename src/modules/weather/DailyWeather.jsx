import { Button, Image } from 'react-bootstrap';
import { DropletFill } from 'react-bootstrap-icons';
import { dateDiffInDays, getDateFromUnix } from '../utils/date';
import { getHighestTemperture, getLowestTemperture, getWeatherIcon } from './weather.utils';
import { useWeather } from './WeatherContext';
import './DailyWeather.css';
import { HBox } from '../../components/layout';
import { mostFrequentString } from '../utils/array';

export const DailyWeather = () => {
  const { weatherData, setForecastDay, forecastDay } = useWeather();

  if (!weatherData) {
    return <></>;
  }

  return (
    <div style={{ display: 'flex', justifyContent: 'center', gap: '10px' }}>
      {weatherData.list.map((hourlyForecasts, i) => {
        const isActive = forecastDay === i;
        const date = getDateFromUnix(hourlyForecasts[0].dt);
        let weekday = date.toLocaleDateString('de-DE', { weekday: 'short', day: 'numeric' });

        const dayDiff = dateDiffInDays(date, new Date());

        if (dayDiff === 0) {
          weekday = 'Heute';
        }
        if (dayDiff === -1) {
          weekday = 'Morgen';
        }
        return (
          <Button
            as="div"
            className={isActive ? 'withArrow' : ''}
            style={{
              background: isActive ? 'rgba(255, 255, 255, 0.3)' : 'rgba(255, 255, 255, 0.03)',
              border: 'none',
              borderRadius: '6px',
              padding: '15px 40px 0px 40px',
              display: 'flex',
              flexDirection: 'column',
              color: isActive ? '#ffff' : '#ffffffbf'
            }}
            key={i}
            onClick={() => setForecastDay(i)}>
            <span style={{ textAlign: 'left' }}>{weekday}</span>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <div>
                <Image
                  style={{ flex: 1 }}
                  src={getWeatherIcon(
                    mostFrequentString(
                      hourlyForecasts.map((f) => f.weather[0].icon.split(/[nd]+/)[0])
                    ) + 'd'
                  )}
                />
              </div>
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  gap: '60px'
                }}>
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                  <span style={{ fontWeight: 'bold' }}>
                    {Math.floor(getHighestTemperture(hourlyForecasts))}°
                  </span>
                  <span>{Math.floor(getLowestTemperture(hourlyForecasts))}°</span>
                </div>
                {isActive && (
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'end' }}>
                    <span style={{ fontSize: '14px', textAlign: 'end' }}>
                      {mostFrequentString(hourlyForecasts.map((f) => f.weather[0].description))}
                    </span>
                    <HBox
                      styles={{
                        fontSize: '14px',
                        alignItems: 'center',
                        gap: '5px'
                      }}>
                      <DropletFill />
                      <span>
                        {Math.floor(Math.max(...hourlyForecasts.map((f) => f.pop)) * 100)}%
                      </span>
                    </HBox>
                  </div>
                )}
              </div>
            </div>
          </Button>
        );
      })}
    </div>
  );
};
