import { getDateFromUnix } from "../utils/date";
import { getWeatherIcon } from "./weather.utils";
import { useWeather } from "./WeatherContext";

export const HourlyWeather = () => {
  const { weatherData, forecastDay } = useWeather();
  return (
    <div style={{ display: "flex", gap: "10px" }}>
      {weatherData.list[forecastDay].map((forecast, i) => {
        return (
          <div
            key={i}
            style={{
              border: "solid 1px grey",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <span>
              {getDateFromUnix(forecast.dt).toLocaleTimeString("de-DE", {
                hour: "numeric",
                minute: "numeric",
              })}
            </span>
            {/* TODO: ugly */}
            <img
              style={{ margin: "-10px 0" }}
              src={getWeatherIcon(forecast.weather[0].icon)}
            />
            <span style={{ fontWeight: "bold" }}>
              {Math.floor(forecast.main.temp)}°
            </span>
          </div>
        );
      })}
    </div>
  );
};
