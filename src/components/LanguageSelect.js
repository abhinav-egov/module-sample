import React from "react";
import { useDispatch, useSelector } from "react-redux";
import Select from "../@egovernments/react-components/Select";
import { useTranslation } from "react-i18next";

const LanguageSelect = () => {
  const { i18n } = useTranslation();
  //   useEffect(() => {
  //     i18n.changeLanguage("en");
  //   }, []);

  const state = useSelector((state) => state);

  const dispatch = useDispatch();

  //   console.log("lang state--->", state);
  const { supportedLangList } = state.languages;
  const handleLangChange = (e) => {
    i18n.changeLanguage(e.target.value);
    dispatch({ type: "CHANGE_LANGUAGE", payload: e.target.value });
  };

  return (
    <>
      {supportedLangList && (
        <Select
          id="lang"
          label="Select language"
          onChange={handleLangChange}
          options={supportedLangList.map((lng) => ({
            value: lng.key,
            text: lng.value,
          }))}
        ></Select>
      )}
    </>
  );
};

export default LanguageSelect;
