import React from "react";
import { Provider } from "react-redux";

import getStore from "./redux/store";
import newComplaintConfig from "./config/new-complaint.json";
import App from "./App";
import Pages from "./@egovernments/digit-utils/enums/Pages";
import mergeConfig from "./@egovernments/digit-utils/config/mergeConfig";

const getMergedConfig = (defaultConfig, deltaConfig) => {
  let mergedConfigObj = defaultConfig;
  for (const key in deltaConfig) {
    if (deltaConfig.hasOwnProperty(key)) {
      const mergedConfig = mergeConfig(defaultConfig[key], deltaConfig[key]);
      mergedConfigObj[key] = mergedConfig;
    }
  }
  return defaultConfig;
};

const ModuleApp = ({ deltaConfig }) => {
  let defaultConfig = {
    [Pages.PGR_LIST]: {},
    [Pages.PGR_NEW_COMPLAINT]: newComplaintConfig,
  };
  return (
    <Provider store={getStore(getMergedConfig(defaultConfig, deltaConfig))}>
      <App />
    </Provider>
  );
};

export default ModuleApp;
