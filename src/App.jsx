import { HistoryProvider } from "./modules/search/SearchContext";
import { WeatherProvider } from "./modules/weather/WeatherContext";
import { WeatherForecast } from "./pages/WeatherForecast";

export const App = () => {
  return (
    <HistoryProvider>
      <WeatherProvider>
        <WeatherForecast />
      </WeatherProvider>
    </HistoryProvider>
  );
};
