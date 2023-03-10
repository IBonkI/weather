import { useEffect, useRef, useState } from 'react';
import { Col, Image, Row } from 'react-bootstrap';
import { getDateFromUnix } from '../utils/date';
import { getWeatherIcon } from './weather.utils';
import { useWeather } from './WeatherContext';
import './HourlyWeather.css';
import { CaretLeftFill, CaretRightFill } from 'react-bootstrap-icons';

export const HourlyWeather = () => {
  const { weatherData, forecastDay } = useWeather();
  const [isOverflowing, setIsOverflowing] = useState(false);

  const scrollContainer = useRef(null);

  const handleScrollRight = () => {
    if (!scrollContainer) {
      return;
    }

    scrollContainer.current.scrollLeft += 280;
  };

  const handleScrollLeft = () => {
    if (!scrollContainer) {
      return;
    }

    scrollContainer.current.scrollLeft -= 225;
  };

  useEffect(() => {
    if (!scrollContainer) {
      return;
    }

    if (scrollContainer.current.offsetWidth < scrollContainer.current.scrollWidth) {
      return setIsOverflowing(true);
    }

    return setIsOverflowing(false);
  }, [scrollContainer, forecastDay]);

  if (!weatherData) {
    return <></>;
  }
  return (
    <div style={{ position: 'relative', display: 'flex', justifyContent: 'center', width: '100%' }}>
      <div
        className="hideScrollbar"
        ref={scrollContainer}
        style={{
          display: 'flex',
          width: '100%',
          gap: '10px',
          margin: '0px 40px',
          overflow: 'auto',
          scrollBehavior: 'smooth'
        }}>
        {weatherData.list[forecastDay].map((forecast, i) => {
          return (
            <div
              key={i}
              style={{
                flexBasis: '250px',
                background: 'rgba(255, 255, 255, 0.2)',
                borderRadius: '6px',
                padding: '10px',
                flexGrow: 0,
                flexShrink: 0,
                display: 'flex',
                flexDirection: 'column'
              }}>
              <span style={{ paddingLeft: '25px' }}>
                {getDateFromUnix(forecast.dt).toLocaleTimeString('de-DE', {
                  hour: 'numeric'
                })}
              </span>
              {/* TODO: ugly */}
              <Row style={{ alignItems: 'center', justifyContent: 'center' }}>
                <Col xs={6}>
                  <Image width="100%" src={getWeatherIcon(forecast.weather[0].icon)} />
                </Col>
                <Col
                  style={{
                    display: 'flex',
                    justifyContent: 'center',
                    flexDirection: 'column'
                  }}
                  xs={6}>
                  <span style={{ fontWeight: 'bold' }}>{Math.floor(forecast.main.temp)}??</span>
                  <span style={{ fontSize: '12px' }}>{forecast.weather[0].description}</span>
                </Col>
              </Row>
            </div>
          );
        })}
        {isOverflowing && (
          <>
            <button
              onClick={handleScrollRight}
              style={{
                position: 'absolute',
                right: -20,
                top: 0,
                color: '#F0EBCE',
                background: '#AA8B56',
                marginTop: 'auto',
                marginBottom: 'auto',
                bottom: 0,
                width: '50px',
                height: '50px'
              }}>
              <CaretRightFill />
            </button>
            <button
              onClick={handleScrollLeft}
              style={{
                position: 'absolute',
                color: '#F0EBCE',
                background: '#AA8B56',
                left: -20,
                top: 0,
                marginTop: 'auto',
                marginBottom: 'auto',
                bottom: 0,
                width: '50px',
                height: '50px'
              }}>
              <CaretLeftFill />
            </button>
          </>
        )}
      </div>
    </div>
  );
};
