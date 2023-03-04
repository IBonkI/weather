import { Star, XCircle } from "react-bootstrap-icons";
import { useHistory } from "./SearchContext";

export const CitySearchHistory = ({ onClick }) => {
  const { cityHistory, clearHistory } = useHistory();

  const handleClickHistory = (cityName) => {
    onClick(cityName);
  };

  return (
    <div>
      {cityHistory &&
        cityHistory.length > 0 &&
        cityHistory.map((c, i) => (
          <span onClick={() => handleClickHistory(c)} key={c + i}>
            {c} <Star />{" "}
          </span>
        ))}
      {cityHistory && cityHistory.length > 0 && (
        <XCircle onClick={() => clearHistory()} />
      )}
    </div>
  );
};
