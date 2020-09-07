import React from "react";


const Form = ({ onSubmit, handlesubmit, children, ...props }) => {
  return (
    <form onSubmit={handlesubmit(onSubmit)} {...props}>{children}</form>
  )
};

export default Form;