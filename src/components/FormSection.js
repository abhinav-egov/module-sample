import React from "react";

const FormSection = ({ children, title, className = "", ...props }) => (
  <div className={"govuk-fieldset govuk-grid-column-full " + className} {...props}>
    {title && <legend className="govuk-fieldset__legend govuk-fieldset__legend--l">
      <h1 className="govuk-fieldset__heading">
        {title}
      </h1>
    </legend>}
    {children}
  </div>
);

export default FormSection;