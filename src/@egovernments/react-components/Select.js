import React from "react";

const Select = React.forwardRef(
  ({ label, options, id, onChange, ...props }, ref) => (
    <div className="govuk-form-group govuk-grid-column-one-half">
      <label className="govuk-label" htmlFor={id}>
        {label}
      </label>
      <select
        className="govuk-select"
        id={id}
        ref={ref}
        {...props}
        onChange={onChange}
      >
        {options.map((item, index) => (
          <option key={`${id}-option-${index}`} value={item.value}>
            {item.text}
          </option>
        ))}
      </select>
    </div>
  )
);

export default Select;
