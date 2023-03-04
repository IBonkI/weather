import { useState } from "react";

export const CitySearch = ({ onSubmit }) => {
  const [cityQuery, setCityQuery] = useState("");

  const handleChangeInput = (e) => {
    setCityQuery(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    onSubmit(cityQuery);

    setCityQuery("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <input value={cityQuery || ""} onChange={handleChangeInput} />
      <button type="submit">Submit</button>
    </form>
  );
};
