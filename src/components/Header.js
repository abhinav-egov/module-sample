import React from "react";
import { useTranslation } from "react-i18next";

const Header = ({ text, ...props }) => {
  const { t } = useTranslation();
  return (
    <h2 className="egov-heading" {...props}>
      {t(text)}
    </h2>
  );
};

export default Header;
