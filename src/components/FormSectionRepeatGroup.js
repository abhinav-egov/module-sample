import React from "react";
import FormSection from "./FormSection";

const FormSectionRepeatGroup = ({ children, dorepeat, repeats, ...props }) => {
  console.log(repeats, props);
  let formSections = [];
  for (let index = 0; index < repeats; index++) {
    formSections.push(<FormSection key={Math.random()} className="repeat-group" {...props}>{children}</FormSection>);

  }
  return (
    <div className="govuk-grid-column-full">
      {formSections}
      <button className="egov-btn" onClick={dorepeat}>
        Add more
      </button>
    </div>
  )
};

export default FormSectionRepeatGroup;