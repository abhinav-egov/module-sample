import React from "react";
import { useDispatch, useSelector } from "react-redux";
import Select from "../@egovernments/react-components/Select";
import { useTranslation } from "react-i18next";

const LanguageSelect = () => {
  const { i18n } = useTranslation();
  const dispatch = useDispatch();
  const state = useSelector((state) => state);
  let { languages } = state.languages;
  const handleLangChange = (e) => {
    i18n.changeLanguage(e.target.value);
    dispatch({ type: "CHANGE_LANGUAGE", payload: e.target.value });
  };

  return (
    <>
      {languages && (
        <Select
          id="lang"
          onChange={handleLangChange}
          options={languages.map((lng) => ({
            value: lng.value,
            text: lng.label,
          }))}
        ></Select>
      )}
    </>
  );
};

export default LanguageSelect;
