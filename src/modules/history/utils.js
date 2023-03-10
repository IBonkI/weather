const serializeSeperator = ';';

export const serializedCityHistory = (lat, lon, cityName) =>
  lat + serializeSeperator + lon + serializeSeperator + cityName;

export const deserializeCityHistory = (cityString) => {
  const [lat, lon, cityName] = cityString.split(';');
  return { lat, lon, cityName };
};
