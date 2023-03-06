import { useRef } from "react";
import { Col, Image, Row } from "react-bootstrap";
import { getDateFromUnix } from "../utils/date";
import { getWeatherIcon } from "./weather.utils";
import { useWeather } from "./WeatherContext";
import "./HourlyWeather.css";

export const HourlyWeather = () => {
  const { weatherData, forecastDay } = useWeather();

  const scrollContainer = useRef(null);

  const handleScrollRight = () => {
    if (!scrollContainer) {
      return;
    }

    scrollContainer.current.scrollLeft += 225;
  };

  const handleScrollLeft = () => {
    if (!scrollContainer) {
      return;
    }

    scrollContainer.current.scrollLeft -= 225;
  };

  if (!weatherData) {
    return <></>;
  }
  return (
    <div style={{ position: "relative" }}>
      <div
        className="hideScrollbar"
        ref={scrollContainer}
        style={{
          display: "flex",
          gap: "10px",
          width: "800px",
          overflow: "auto",
          scrollBehavior: "smooth",
        }}
      >
        {weatherData.list[forecastDay].map((forecast, i) => {
          return (
            <div
              key={i}
              style={{
                flexBasis: "250px",
                background: "rgba(255, 255, 255, 0.03)",
                borderRadius: "6px",
                padding: "10px",
                flexGrow: 0,
                flexShrink: 0,
                display: "flex",
                flexDirection: "column",
              }}
            >
              <span style={{ paddingLeft: "25px" }}>
                {getDateFromUnix(forecast.dt).toLocaleTimeString("de-DE", {
                  hour: "numeric",
                })}
              </span>
              {/* TODO: ugly */}
              <Row style={{ alignItems: "center", justifyContent: "center" }}>
                <Col xs={6}>
                  <Image
                    width="100%"
                    src={getWeatherIcon(forecast.weather[0].icon)}
                  />
                </Col>
                <Col
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    flexDirection: "column",
                  }}
                  xs={6}
                >
                  <span style={{ fontWeight: "bold" }}>
                    {Math.floor(forecast.main.temp)}°
                  </span>
                  <span>{forecast.weather[0].description}</span>
                </Col>
              </Row>
            </div>
          );
        })}
        <button
          onClick={handleScrollRight}
          style={{
            position: "absolute",
            right: -50,
            top: 0,
            marginTop: "auto",
            marginBottom: "auto",
            bottom: 0,
            width: "50px",
            height: "50px",
          }}
        >
          {">"}
        </button>
        <button
          onClick={handleScrollLeft}
          style={{
            position: "absolute",
            left: -50,
            top: 0,
            marginTop: "auto",
            marginBottom: "auto",
            bottom: 0,
            width: "50px",
            height: "50px",
          }}
        >
          {"<"}
        </button>
      </div>
    </div>
  );
};
