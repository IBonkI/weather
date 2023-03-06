import { useState } from "react";
import { Button, Col, Form, Row } from "react-bootstrap";
import { GeoAltFill } from "react-bootstrap-icons";

const getAPIURL = (lat, lon) =>
  `http://api.openweathermap.org/geo/1.0/reverse?lat=${lat}&lon=${lon}&limit=${"1"}&appid=${
    import.meta.env.VITE_OPEN_WEATHER_API_KEY
  }`;

export const CitySearch = ({ onSubmit }) => {
  const [cityQuery, setCityQuery] = useState("");

  const handleChangeInput = (e) => {
    setCityQuery(e.target.value);
  };

  const handleSubmit = (e) => {
    if (e) {
      e.preventDefault();
    }

    onSubmit(cityQuery);

    setCityQuery("");
  };

  var options = {
    enableHighAccuracy: true,
    timeout: 5000,
    maximumAge: 0,
  };
  function success(pos) {
    var crd = pos.coords;
    let isOk = false;

    fetch(getAPIURL(crd.latitude, crd.longitude))
      .then((res) => {
        if (!res.ok) {
          return res.json();
        }

        isOk = true;
        return res.json();
      })
      .then((data) => {
        if (!isOk) {
          return;
        }
        onSubmit(data[0].name);
      });

    console.log(pos, "#########");

    console.log("Your current position is:");
    console.log(`Latitude : ${crd.latitude}`);
    console.log(`Longitude: ${crd.longitude}`);
    console.log(`More or less ${crd.accuracy} meters.`);
  }

  function errors(err) {
    console.warn(`ERROR(${err.code}): ${err.message}`);
  }

  const getGeoLocation = () => {
    if (!navigator.geolocation) {
      return;
    }

    navigator.permissions.query({ name: "geolocation" }).then((result) => {
      if (result.state === "granted") {
        return navigator.geolocation.getCurrentPosition(success);
      }

      if (result.state === "prompt") {
        return navigator.geolocation.getCurrentPosition(
          success,
          errors,
          options
        );
      }
    });
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Row>
        <Col>
          <Form.Control
            type="search"
            value={cityQuery || ""}
            onChange={handleChangeInput}
          />
        </Col>
        <Col>
          <Button type="button" onClick={getGeoLocation}>
            <GeoAltFill />
          </Button>
        </Col>
      </Row>
    </Form>
  );
};
