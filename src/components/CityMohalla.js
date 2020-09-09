import React, { Fragment, useState } from "react";
import Select from "../@egovernments/react-components/Select";
import { useSelector } from "react-redux";

const CityMohalla = ({ children, ...props }) => {
  const state = useSelector((state) => state.formData);
  console.log("State==============>", state);
  const [cities, setcities] = useState(["Amritsar", "ludhiyana"]);
  const handleCityChange = () => {
    console.log("hiiiiiiiiiiiiiii");
  };

  return (
    <Fragment>
      <select
        className="custom-select"
        id="inputGroupSelect01"
        onChange={handleCityChange}
      >
        <option value="">Choose...</option>
        {cities.map((city, index) => (
          <option key={index} value={city}></option>
        ))}
      </select>
      {/* <select onChange={handleCityChange}>
        <option value="">Choose...</option>
        {localityKeys.map((locality, index) => (
          <option key={index} value={locality.value}></option>
        ))}
      </select> */}
    </Fragment>
  );
};

export default CityMohalla;
