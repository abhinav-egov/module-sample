import React from "react";
import { Provider } from "react-redux";

import getStore from "./redux/store";
import App from "./App";
import defaultConfig from "./config";
import { useStore } from "./@egovernments/digit-utils/services";
import { initI18n } from "./@egovernments/digit-utils/translations";

const ModuleApp = ({ deltaConfig, stateCode, cityCode, moduleCode }) => {
  const store = useStore(defaultConfig, { deltaConfig, stateCode, cityCode, moduleCode });
  initI18n();

  if (Object.keys(store).length === 0) {
    return <div>Loading</div>;
  }
  return (
    <Provider store={getStore(store)}>
      <App />
    </Provider>
  );
};

export default ModuleApp;
