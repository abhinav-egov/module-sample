import { useEffect, useState } from "react";
import mergeConfig from "../../config/mergeConfig";
import { StoreService } from "./service";

export const useStore = (defaultConfig, { deltaConfig, stateCode, cityCode, moduleCode }) => {
  const [defaultStore, setDefaultStore] = useState({});

  useEffect(() => {
    const config = mergeConfig(defaultConfig, deltaConfig);
    StoreService.defaultData(stateCode, cityCode, moduleCode).then((defaultData) => {
      const store = { config, ...defaultData };
      console.log("store:", store);
      setDefaultStore(store);
    });
  }, [defaultConfig, deltaConfig, stateCode, cityCode, moduleCode]);

  return defaultStore;
};
