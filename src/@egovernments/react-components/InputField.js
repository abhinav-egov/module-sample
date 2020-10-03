import React from "react";
import { useTranslation } from "react-i18next";

const InputField = React.forwardRef(({ label, placeholder, ...props }, ref) => {
  let { t } = useTranslation();
  return (
    <div className="egov-form-group govuk-grid-column-one-half">
      {label ? (
        <label htmlFor={props.id} className="egov-label">
          {t(label)}
        </label>
      ) : null}
      <input className="egov-input" ref={ref} placeholder={t(placeholder)} {...props} />
    </div>
  );
});

export default InputField;
