import React from "react";

const InputField = React.forwardRef(({ label, ...props }, ref) => {
  return (
    <div className="egov-form-group govuk-grid-column-one-half">
      {label ? <label htmlFor={props.id} className="egov-label">{label}</label> : null}
      <input className="egov-input" ref={ref}  {...props} />
    </div>
  )
});

export default InputField;