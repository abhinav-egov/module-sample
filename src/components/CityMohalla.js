import React, { Fragment, useState } from "react";
import Select from "../@egovernments/react-components/Select";
import { useSelector } from "react-redux";

const CityMohalla = ({ children, ...props }) => {
  const state = useSelector((state) => state.formData);
  console.log("State==============>", state);
  const [cities, setcities] = useState([
    { name: "Amritsar" },
    { name: "Ludiyana" },
  ]);

  const [mohalla, setMohalla1] = useState([
    { name: "Mohalla1" },
    { name: "Mohall2" },
  ]);

  const [mohalla2, setMohalla2] = useState([
    { name: "Mohalla3" },
    { name: "Mohall4" },
  ]);

  const [allMohalla, setMohalla] = useState([]);

  // const [mohalla, setMohalla] = useState(["Amritsar", "ludhiyana"]);
  const handleCityChange = (e) => {
    console.log(e.target.value);
    if (e.target.value === "Amritsar") {
      setMohalla([...mohalla]);
    } else {
      setMohalla([...mohalla2]);
    }
  };

  console.log("city-mohalla");

  return (
    <Fragment>
      <Select
        id="inputGroupSelect01"
        onChange={handleCityChange}
        options={cities.map((city, index) => ({
          value: city.name,
          text: city.name,
        }))}
      ></Select>
      <Select
        id="inputGroupSelect02"
        options={allMohalla.map((city, index) => ({
          value: city.name,
          text: city.name,
        }))}
      ></Select>
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
