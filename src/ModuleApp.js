import React from 'react';
import { Provider } from "react-redux"

import getStore from "./redux/store"
import newComplaintConfig from "./config/new-complaint.json";
import App from './App';
import Pages from './@egovernments/digit-utils/enums/Pages';

const ModuleApp = () => (
  <Provider store={getStore({ [Pages.PGR_LIST]: {}, [Pages.PGR_NEW_COMPLAINT]: newComplaintConfig })}>
    <App />
  </Provider>
)

export default ModuleApp;