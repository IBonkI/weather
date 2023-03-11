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
          <div
            key={c + i}
            onClick={() => handleClickHistory(c)}
            style={{
              display: 'inline',
              borderRight: '1px solid #F0EBCE',
              padding: '5px 20px',
              cursor: 'pointer',
              userSelect: 'none'
            }}>
            <span>
              <img src={getWeatherIcon(c.weather[0].icon)} height="50px" width="50px" />
              {c.name}
            </span>
          </div>
        ))}
      {cityHistory && cityHistory.length > 0 && (
        <XCircle className="mx-3" style={{ cursor: 'pointer' }} onClick={() => clearHistory()} />
      )}
    </div>
  );
};
