import { Container, Navbar } from 'react-bootstrap';
import { CitySearch } from '../modules/search/CitySearch';
import { CitySearchHistory } from '../modules/history/CitySearchHistory';
// import { CitySearchHistory } from '../modules/search/CitySearchHistory';
import { useHistory } from '../modules/history/HistoryContext';
import { CurrentWeather } from '../modules/weather/CurrentWeather';
import { DailyWeather } from '../modules/weather/DailyWeather';
import { HourlyWeather } from '../modules/weather/HourlyWeather';
import { useWeather } from '../modules/weather/WeatherContext';
import { HBox } from '../components/layout';

export const WeatherForecast = () => {
  const { fetchWeatherData, fetchCurrentWeatherData, weatherData } = useWeather();

  const { addCityToHistory } = useHistory();

  const fetchAndAddToHistory = (lat, lon, cityName) => {
    fetchWeatherData({ lat, lon, cityName });

    fetchCurrentWeatherData({ lat, lon, cityName }, addCityToHistory);
  };

  return (
    <div style={{ flex: 1 }}>
      <Navbar fixed="top" bg="dark">
        <Container>
          <HBox styles={{ alignItems: 'center' }} gap="30px">
            <CitySearch onSubmit={fetchAndAddToHistory} />
            <CitySearchHistory onClick={fetchAndAddToHistory} />
          </HBox>
        </Container>
      </Navbar>
      <Container
        style={{
          display: 'flex',
          alignItems: 'center',
          flexDirection: 'column'
        }}>
        {weatherData && (
          <>
            <CurrentWeather />
            <DailyWeather />
            <div className="mt-4">
              <HourlyWeather />
            </div>
          </>
        )}
      </Container>
    </div>
  );
};
