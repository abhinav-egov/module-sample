import React, { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import Select from "../@egovernments/react-components/Select";
import { useTranslation } from "react-i18next";
import { updateLocalizationResources } from "../redux/actions";

const LanguageSelect = () => {
  const { i18n } = useTranslation();
  const dispatch = useDispatch();
  const localizationResources = useCallback(() => dispatch(updateLocalizationResources()), [dispatch]);
  const languages = useSelector((state) => state.languages);

  const handleLangChange = (e) => {
    const lng = e.target.value;
    i18n.changeLanguage(lng.split("_")[0]);
    dispatch({ type: "CHANGE_LANGUAGE", payload: lng });
    localizationResources();
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
