import React from "react";
import { useTranslation } from "react-i18next";

const Button = ({ text, ...props }) => {
  const { t } = useTranslation();
  return (
    <div className="govuk-grid-column-full" style={{ float: "left", width: "auto" }}>
      <button className="egov-btn" data-module="govuk-button">
        {t(text)}
      </button>
    </div>
  );
};

export default Button;
