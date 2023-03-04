import { createContext, useContext, useEffect, useState } from "react";

const HistoryContext = createContext();

export const HistoryProvider = ({ children }) => {
  const [cityHistory, setCityHistory] = useState([]);

  const clearHistory = () => {
    setCityHistory([]);
    localStorage.removeItem("cityHistory");
  };

  useEffect(() => {
    const parsedHistory = JSON.parse(localStorage.getItem("cityHistory"));
    if (!parsedHistory) {
      return;
    }
    setCityHistory(parsedHistory);
  }, []);

  const addCityToHistory = (cityName) => {
    console.log("hier drin, cityName", cityName);
    const newCityHistory = cityHistory;
    const indexOfCity = newCityHistory.indexOf(cityName);

    if (indexOfCity > -1) {
      newCityHistory.splice(indexOfCity, 1);
    }

    newCityHistory.push(cityName);

    setCityHistory(newCityHistory);
    localStorage.setItem("cityHistory", JSON.stringify(newCityHistory));
  };

  const context = {
    addCityToHistory,
    cityHistory,
    clearHistory,
  };

  return (
    <HistoryContext.Provider value={context}>
      {children}
    </HistoryContext.Provider>
  );
};

export const useHistory = () => {
  const ctx = useContext(HistoryContext);

  if (!ctx) {
    throw new Error("Use Context Inside Provider");
  }

  return ctx;
};
