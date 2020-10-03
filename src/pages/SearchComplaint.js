import React, { useMemo } from "react";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { getConfig } from "../@egovernments/digit-utils/config";
import Pages from "../@egovernments/digit-utils/enums/Pages";
import ComponentMap from "../ComponentMap";
import { GetFunction } from "../FunctionRegistry";
import { Renderer } from "../Renderer";

const SearchComplaint = () => {
  const state = useSelector((state) => state.formData);
  const pageConfig = useSelector((state) => state.config[Pages.PGR_SEARCH]);

  const { handleSubmit, register } = useForm({ defaultValues: {} });

  const onSubmit = (data) => {
    console.log("form", data);
  };

  const configParams = {
    config: pageConfig,
    state,
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

export default SearchComplaint;
