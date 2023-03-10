import { useCallback, useState } from 'react';
import { Form } from 'react-bootstrap';
import { Search } from 'react-bootstrap-icons';
import { HBox } from '../../components/layout';
import { debounce } from '../utils/performance';
import './CitySearch.css';
import { CitySearchCurrentLocation } from './CitySearchCurrentLocation';
import { CitySearchSuggestions } from './CitySearchSuggestions';

export const CitySearch = ({ onSubmit }) => {
  const [cityQuery, setCityQuery] = useState('');
  const [citySuggestions, setCitySuggestions] = useState();
  const [isInInput, setIsInInput] = useState(false);

  const fetchSuggestions = useCallback((input) => {
    const mapToSuggestions = (apiSuggestion) => {
      if (apiSuggestion.length === 0) {
        return;
      }
      return apiSuggestion.map((s) => ({
        addressLine1: s.properties.address_line1,
        addressLine2: s.properties.address_line2,
        lat: s.properties.lat,
        lon: s.properties.lon,
        cityName: s.properties.city
      }));
    };
    fetch(
      `https://api.geoapify.com/v1/geocode/autocomplete?text=${input}&apiKey=${
        import.meta.env.VITE_GEO_APIFY_API_KEY
      }`
    )
      .then((response) => response.json())
      .then((result) => setCitySuggestions(mapToSuggestions(result.features)))
      .catch(() => setCitySuggestions(undefined));
  }, []);

  const debounceFetchSuggestions = useCallback(debounce(fetchSuggestions, 500), [fetchSuggestions]);

  const handleChangeInput = (e) => {
    const input = e.target.value;
    setCityQuery(input);
    debounceFetchSuggestions(input);
  };

  // TODO: Replace [0] with currentlySelected
  const handleClickSuggestion =
    (
      lat = citySuggestions[0].lat,
      lon = citySuggestions[0].lon,
      cityName = citySuggestions[0].cityName
    ) =>
    () => {
      onSubmit(lat, lon, cityName);
      setCityQuery('');
      setCitySuggestions(undefined);
    };

  const handleSubmit = (e) => {
    // Dirty Fix: Use citySuggestion instead of text passed by User
    // !Important: But keep this when suggestion API is not working
    console.log(citySuggestions, '##########');
    if (e) {
      e.preventDefault();
    }
    if (!citySuggestions) {
      return;
    }

    handleClickSuggestion()();
    setCityQuery('');
  };

  const handleFocusSearch = () => {
    setIsInInput(true);
  };

  const handleBlurSearch = () => {
    setTimeout(() => {
      setIsInInput(false);
    }, 200);
  };

  return (
    <Form onSubmit={handleSubmit}>
      <HBox gap={10}>
        <CitySearchCurrentLocation onClick={onSubmit} />
        <div style={{ position: 'relative', width: '300px' }}>
          <Form.Control
            placeholder="Suche"
            type="search"
            value={cityQuery || ''}
            onChange={handleChangeInput}
            onFocus={handleFocusSearch}
            onBlur={handleBlurSearch}
          />
          <span
            style={{
              position: 'absolute',
              right: 15,
              top: 0,
              bottom: 0,
              marginTop: 'auto',
              marginBottom: 'auto',
              color: 'grey',
              display: 'flex',
              alignItems: 'center'
            }}>
            <Search />
          </span>
          {!!citySuggestions && isInInput && (
            <CitySearchSuggestions
              citySuggestions={citySuggestions}
              onClick={handleClickSuggestion}
            />
          )}
        </div>
      </HBox>
    </Form>
  );
};
