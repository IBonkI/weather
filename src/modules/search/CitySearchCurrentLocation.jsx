import { Button } from 'react-bootstrap';
import { GeoAltFill } from 'react-bootstrap-icons';

const getAPIURL = (lat, lon) =>
  `http://api.openweathermap.org/geo/1.0/reverse?lat=${lat}&lon=${lon}&limit=${'1'}&appid=${
    import.meta.env.VITE_OPEN_WEATHER_API_KEY
  }`;

export const CitySearchCurrentLocation = ({ onClick }) => {
  const getGeoLocation = () => {
    if (!navigator.geolocation) {
      return;
    }

    const success = (pos) => {
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
          onClick(crd.latitude, crd.longitude, data[0].name);
        });
    };

    navigator.permissions.query({ name: 'geolocation' }).then((result) => {
      if (result.state === 'granted') {
        return navigator.geolocation.getCurrentPosition(success);
      }

      if (result.state === 'prompt') {
        return navigator.geolocation.getCurrentPosition(success, undefined, {
          enableHighAccuracy: true,
          timeout: 5000,
          maximumAge: 0
        });
      }
    });
  };
  return (
    <Button variant="outline-secondary" type="button" onClick={getGeoLocation}>
      <GeoAltFill />
    </Button>
  );
};
