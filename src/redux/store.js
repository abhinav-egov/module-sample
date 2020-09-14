import { createStore, compose, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";
import getRootReducer from "./reducers";

const middleware = [thunk];
const getStore = (defaultConfig, languageConfig) => {
  return createStore(
    getRootReducer(defaultConfig, languageConfig),
    // compose(applyMiddleware(...middleware), process.env.NODE_ENV !== "production" ? composeWithDevTools() : null)
    process.env.NODE_ENV !== "production" ? composeWithDevTools(applyMiddleware(...middleware)) : compose(applyMiddleware(...middleware))
  );
};
export default getStore;
