import React, { Fragment } from "react";
import Select from "../@egovernments/react-components/Select";

const CityMohalla = ({ children, ...props }) => {
  const state = useSelector((state) => state.formData);
  const onSelect = () => { }
  return (
    <Fragment>
      <Select></Select>
      <Select></Select>
    </Fragment>
  )
};

export default CityMohalla;