import React from "react";

const Button = ({ text, ...props }) => (
  <div className="govuk-grid-column-full">
    <button className="egov-btn" data-module="govuk-button">
      {text}
    </button>
  </div>
);

export default Button;



