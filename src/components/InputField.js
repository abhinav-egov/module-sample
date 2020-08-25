import React from "react";

const InputField = ({ label, ...props }) => (
  <div className="egov-form-group govuk-grid-column-one-half">
    {label ? <label htmlFor={props.id} className="egov-label">{label}</label> : null}
    <input className="egov-input" {...props} />
  </div>
);

export default InputField;