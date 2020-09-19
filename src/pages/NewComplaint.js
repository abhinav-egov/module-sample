import React, { useMemo } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";

import Pages from "../@egovernments/digit-utils/enums/Pages";
import { getConfig } from "../@egovernments/digit-utils/config";
import ComponentMap from "../ComponentMap";
import { GetFunction } from "../FunctionRegistry";
import { Renderer } from "../Renderer";

const NewComplaintPage = () => {
  const state = useSelector((state) => state.formData);
  const pageConfig = useSelector((state) => state.config[Pages.PGR_NEW_COMPLAINT]);
  const { handleSubmit, register } = useForm({ defaultValues: {} });
  const dispatch = useDispatch();

  // const handleOnChange = (field) => (event) => {
  //   const { value } = event.target;
  //   dispatch({ type: "UPDATE_FEILD", payload: { field, value } });
  // };

  const handleRepeatClick = (field) => (event) => {
    event.preventDefault();
    dispatch({ type: "UPDATE_REPEAT", payload: { field } });
  };

  // const handleSubmit = data => {
  //   // e && e.preventDefault();
  //   console.log("state", state, data);
  // }
  // RegisterFunction('form-submit', handleSubmit);

  const onSubmit = (data) => {
    console.log("form", data);
  };

  const configParams = {
    config: pageConfig,
    state,
    repeatClicked: handleRepeatClick,
    handlesubmit: handleSubmit,
    // onChange: handleCityChange,
    register,
    onSubmit,
  };

  const config = useMemo(() => {
    return getConfig(ComponentMap, GetFunction, configParams);
  }, [configParams]);

  return (
    <div className="govuk-width-container">
      <h1 className="egov-heading">eGov PGR</h1>
      <div className="govuk-grid-row">
        <Renderer config={config} />
      </div>
    </div>
  );
};

export default NewComplaintPage;
