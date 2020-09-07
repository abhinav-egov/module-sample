import React from "react";

const Select = React.forwardRef(({ label, options, id, ...props }, ref) => (
  <div className="govuk-form-group govuk-grid-column-one-half">
    <label className="govuk-label" htmlFor={id}>
      {label}
    </label>
    <select className="govuk-select" id={id} ref={ref} {...props}>
      {options.map((item, index) => <option key={`${id}-option-${index}`} value={item.value}>{item.text}</option>)}
    </select>
  </div>));

export default Select;