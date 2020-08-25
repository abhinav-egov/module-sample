import React from "react";

const Form = ({ submit, children, ...props }) => (
  <form onSubmit={submit} {...props}>{children}</form>
);

export default Form;