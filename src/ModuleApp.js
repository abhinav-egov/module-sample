import React, { useEffect, useState } from "react";
import { Provider } from "react-redux";

import getStore from "./redux/store";
import App from "./App";
import mergeConfig from "./@egovernments/digit-utils/config/mergeConfig";
import defaultConfig from "./config";
import { InitService } from "./@egovernments/digit-utils/services";

const ModuleApp = ({ deltaConfig, stateCode, moduleCode }) => {
  const [defaultStore, setDefaultStore] = useState({});

  useEffect(() => {
    const config = mergeConfig(defaultConfig, deltaConfig);
    InitService.defaultData(stateCode, moduleCode).then((defaultData) => {
      const store = { config, ...defaultData };
      console.log("defaultStore", store);
      setDefaultStore(store);
    });
  }, [deltaConfig, stateCode, moduleCode]);

  if (Object.keys(defaultStore).length === 0) {
    return <div>Loading</div>;
  }
  return (
    <Provider store={getStore(defaultStore)}>
      <App />
    </Provider>
  );
};

export default ModuleApp;
