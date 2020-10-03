import React from "react";
import { useTranslation } from "react-i18next";

const InputField = React.forwardRef(({ label, i18nlabelkey, placeholder, i18nplaceholderkey, ...props }, ref) => {
  let { t } = useTranslation();
  return (
    <div className="egov-form-group govuk-grid-column-one-half">
      {i18nlabelkey || label ? (
        <label htmlFor={props.id} className="egov-label">
          {t(i18nlabelkey) || label}
        </label>
      ) : null}
      <input className="egov-input" ref={ref} placeholder={t(i18nplaceholderkey) || placeholder} {...props} />
    </div>
  );
});

export default InputField;
