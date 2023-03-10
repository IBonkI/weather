import { XCircle } from 'react-bootstrap-icons';
import { getWeatherIcon } from '../weather/weather.utils';
import { useHistory } from './HistoryContext';

export const CitySearchHistory = ({ onClick }) => {
  const { cityHistory, clearHistory } = useHistory();

  const handleClickHistory = (city) => {
    onClick(city.coord.lat, city.coord.lon, city.name);
  };

  return (
    <div>
      {cityHistory &&
        cityHistory.length > 0 &&
        cityHistory.map((c, i) => (
          <span onClick={() => handleClickHistory(c)} key={c + i}>
            <img src={getWeatherIcon(c.weather[0].icon)} height="50px" width="50px" />
            {c.name}
          </span>
        ))}
      {cityHistory && cityHistory.length > 0 && (
        <XCircle className="ml-4" onClick={() => clearHistory()} />
      )}
    </div>
  );
};
