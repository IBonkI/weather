import { getDateFromUnix } from "../utils/date";
import { getWeatherIcon } from "./weather.utils";
import { useWeather } from "./WeatherContext";

export const CurrentWeather = () => {
  const { weatherData, forecastDay } = useWeather();

  const getTimeForecastIndexForMiddle =
    weatherData && weatherData.list[forecastDay].length - 1 < 5
      ? weatherData.list[forecastDay].length - 1
      : 5;

  return (
    <>
      <h1>{weatherData.city.name}</h1>

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
          }}
        >
          <img
            src={getWeatherIcon(
              weatherData.list[forecastDay][getTimeForecastIndexForMiddle]
                .weather[0].icon
            )}
          />
          <span>
            {Math.floor(
              weatherData.list[forecastDay][getTimeForecastIndexForMiddle].main
                .temp
            )}
            °C
          </span>
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-end",
          }}
        >
          <span>Wetter</span>
          <span>
            {getDateFromUnix(
              weatherData.list[forecastDay][getTimeForecastIndexForMiddle].dt
            ).toLocaleDateString("de-DE", { weekday: "long" })}
          </span>
          <span>
            {
              weatherData.list[forecastDay][getTimeForecastIndexForMiddle]
                .weather[0].description
            }
          </span>
        </div>
      </div>
    </>
  );
};
