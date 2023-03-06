import { Container } from "react-bootstrap";
import { CitySearch } from "../modules/search/CitySearch";
import { CitySearchHistory } from "../modules/search/CitySearchHistory";
import { useHistory } from "../modules/search/SearchContext";
import { CurrentWeather } from "../modules/weather/CurrentWeather";
import { DailyWeather } from "../modules/weather/DailyWeather";
import { HourlyWeather } from "../modules/weather/HourlyWeather";
import { useWeather } from "../modules/weather/WeatherContext";

export const WeatherForecast = () => {
  const { fetchWeatherData, fetchCurrentWeatherData, weatherData } =
    useWeather();

  const { addCityToHistory } = useHistory();

  const fetchAndAddToHistory = (cityName) => {
    console.log(cityName, "##########");
    fetchWeatherData(cityName, (data) => {
      addCityToHistory(data.city.name);
    });

    fetchCurrentWeatherData(cityName);
  };

  return (
    <div style={{ flex: 1 }}>
      <Container
        style={{
          display: "flex",
          alignItems: "center",
          flexDirection: "column",
        }}
      >
        <CitySearch onSubmit={fetchAndAddToHistory} />
        {weatherData && (
          <>
            <CurrentWeather />
            <DailyWeather />
            <div className="mt-4">
              <HourlyWeather />
            </div>
          </>
        )}
        <CitySearchHistory onClick={fetchAndAddToHistory} />
      </Container>
    </div>
  );
};
