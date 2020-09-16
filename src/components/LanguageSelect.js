import React from "react";
import { useDispatch, useSelector } from "react-redux";
import Select from "../@egovernments/react-components/Select";
import { useTranslation } from "react-i18next";

const LanguageSelect = () => {
  const { i18n } = useTranslation();
  let languages = [];
  const state = useSelector((state) => state);
  languages = state.languages;
  const dispatch = useDispatch();
  const handleLangChange = (e) => {
    i18n.changeLanguage(e.target.value);
    dispatch({ type: "CHANGE_LANGUAGE", payload: e.target.value });
  };

  return (
    <>
      {languages.length && (
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
