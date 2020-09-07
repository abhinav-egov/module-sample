import React from 'react';
import { Provider } from "react-redux"

import getStore from "./redux/store"
import newComplaintConfig from "./config/new-complaint.json";
import App from './App';
import Pages from './@egovernments/digit-utils/enums/Pages';

const getMergedConfig = (defaultConfig, delta) => {
  return defaultConfig;
}

const ModuleApp = ({ deltaConfig }) => {
  const defaultConfig = { [Pages.PGR_LIST]: {}, [Pages.PGR_NEW_COMPLAINT]: newComplaintConfig };

  return (
    <Provider store={getStore(getMergedConfig(defaultConfig, deltaConfig))}>
      <App />
    </Provider>
  )
}

export default ModuleApp;