import { createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import getRootReducer from "./reducers";

// const store = createStore(rootReducer, process.env.NODE_ENV !== 'production' ? composeWithDevTools() : null);

const getStore = (defaultConfig) =>
  createStore(
    getRootReducer(defaultConfig),
    process.env.NODE_ENV !== "production" ? composeWithDevTools() : null
  );

export default getStore;
