import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { MdmsService } from "../digit-utils/services/MDMS";

const Select = React.forwardRef(({ label, options, id, mdmsdetails = null, onChange, ...props }, ref) => {
  const [selectOptions, setSelectOptions] = useState(options);
  const { t } = useTranslation();
  const { code } = useSelector((state) => state).stateInfo;
  useEffect(() => {
    if (mdmsdetails) {
      MdmsService.getDataByCriteria(code, mdmsdetails).then((list) => {
        let criteriaOptions = list.map((item) => ({
          value: item.name,
          text: item.i18nKey,
        }));
        setSelectOptions([...criteriaOptions]);
      });
    }
  }, [code, mdmsdetails]);

  return (
    <div className="govuk-form-group govuk-grid-column-one-half">
      <label className="govuk-label" htmlFor={id}>
        {label}
      </label>
      <select className="govuk-select" id={id} ref={ref} {...props} onChange={onChange}>
        {selectOptions.map((item, index) => (
          <option key={`${id}-option-${index}`} value={item.value}>
            {t(item.text)}
          </option>
        ))}
      </select>
    </div>
  );
});

export default Select;
