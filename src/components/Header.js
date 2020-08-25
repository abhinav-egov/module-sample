import React from "react";

const Header = ({ text, ...props }) => (
  <h2 className="egov-heading" {...props}>{text}</h2>
);

export default Header;