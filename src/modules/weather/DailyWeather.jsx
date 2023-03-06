import { useEffect } from "react";
import { Button, Col, Image, Row } from "react-bootstrap";
import { dateDiffInDays, getDateFromUnix } from "../utils/date";
import { getWeatherIcon } from "./weather.utils";
import { useWeather } from "./WeatherContext";

export const DailyWeather = () => {
  const { weatherData, setForecastDay, forecastDay } = useWeather();

  if (!weatherData) {
    return <></>;
  }

  // TODO: Replace [0]
  return (
    <div style={{ display: "flex", justifyContent: "center", gap: "10px" }}>
      {weatherData.list.map((hourlyForecasts, i) => {
        const date = getDateFromUnix(hourlyForecasts[0].dt);
        let weekday = date.toLocaleDateString("de-DE", { weekday: "long" });

        const dayDiff = dateDiffInDays(date, new Date());

        if (dayDiff === 0) {
          weekday = "Heute";
        }
        if (dayDiff === -1) {
          weekday = "Morgen";
        }
        return (
          <Button
            as="div"
            style={{
              background:
                forecastDay === i
                  ? "rgba(255, 255, 255, 0.3)"
                  : "rgba(255, 255, 255, 0.03)",
              border: "none",
              borderRadius: "6px",
              padding: "10px",
              display: "flex",
              flexBasis: "125px",
              flexDirection: "column",
            }}
            key={i}
            onClick={() => setForecastDay(i)}
          >
            {weekday}
            <Row style={{ alignItems: "center", justifyContent: "center" }}>
              <Image
                width="103%"
                src={getWeatherIcon(hourlyForecasts[0].weather[0].icon)}
              />
              <Col
                style={{
                  display: "flex",
                  justifyContent: "center",
                  flexDirection: "column",
                }}
                xs={12}
              >
                <span style={{ fontWeight: "bold" }}>
                  {Math.floor(hourlyForecasts[0].main.temp)}°
                </span>
                <span>{hourlyForecasts[0].weather[0].description}</span>
              </Col>
            </Row>
          </Button>
        );
      })}
    </div>
  );
};
