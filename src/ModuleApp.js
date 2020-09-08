import React from "react";
import { Provider } from "react-redux";

import getStore from "./redux/store";
import newComplaintConfig from "./config/new-complaint.json";
import App from "./App";
import Pages from "./@egovernments/digit-utils/enums/Pages";
import mergeConfig from "./@egovernments/digit-utils/config/mergeConfig";

// const getMergedConfig = (defaultConfig, delta) => {
//   return defaultConfig;
// };

const ModuleApp = ({ deltaConfig }) => {
  let defaultConfig = {
    [Pages.PGR_LIST]: {},
    [Pages.PGR_NEW_COMPLAINT]: newComplaintConfig,
  };
  // let mergesConfigPgr = mergeConfig(
  //   defaultConfig["pgr-new-complaint"],
  //   deltaConfig
  // );
  defaultConfig = {
    [Pages.PGR_LIST]: {},
    [Pages.PGR_NEW_COMPLAINT]: mergeConfig(
      defaultConfig["pgr-new-complaint"],
      deltaConfig
    ),
  };
  return (
    <Provider store={getStore(defaultConfig)}>
      <App />
    </Provider>
  );
};

export default ModuleApp;
