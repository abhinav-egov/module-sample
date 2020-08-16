import React from "react";

const InputField = ({ label, ...props }) => (
  <div className="govuk-form-group">
    {label ? <label htmlFor={props.id} className="govuk-label">{label}</label> : null}
    <input className="govuk-input govuk-!-width-two-thirds" {...props} />
  </div>
);

export default InputField;