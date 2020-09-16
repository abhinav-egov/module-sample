import React, { useEffect, useState } from "react";
import { Provider } from "react-redux";

import getStore from "./redux/store";
import newComplaintConfig from "./config/new-complaint.json";
// import languageConfig from "./config/languageList.json";
import App from "./App";
import Pages from "./@egovernments/digit-utils/enums/Pages";
import mergeConfig from "./@egovernments/digit-utils/config/mergeConfig";
import { MdmsService } from "./@egovernments/digit-utils/services/MDMS";

const getMergedConfig = (defaultConfig, deltaConfig) => {
  let mergedConfigObj = defaultConfig;
  for (const key in deltaConfig) {
    if (deltaConfig.hasOwnProperty(key)) {
      const mergedConfig = mergeConfig(defaultConfig[key], deltaConfig[key]);
      mergedConfigObj[key] = mergedConfig;
    }
  }
  return mergedConfigObj;
};

const ModuleApp = ({ deltaConfig }) => {
  const [availableLanguages, setAvailableLanguages] = useState({});
  useEffect(() => {
    let availableLanguages = {};
    const fetchAvailableLanguages = async () => {
      availableLanguages = await MdmsService.init();
      setAvailableLanguages(availableLanguages.MdmsRes["common-masters"].StateInfo[0].languages);
    };
    fetchAvailableLanguages();
  }, []);

  let defaultConfig = {
    [Pages.PGR_LIST]: {},
    [Pages.PGR_NEW_COMPLAINT]: newComplaintConfig,
  };
  return (
    <Provider store={getStore(getMergedConfig(defaultConfig), availableLanguages)}>
      <App />
    </Provider>
  );
};

export default ModuleApp;
