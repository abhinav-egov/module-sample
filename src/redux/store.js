import { createStore, compose, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";
import getRootReducer from "./reducers";

// const store = createStore(rootReducer, process.env.NODE_ENV !== 'production' ? composeWithDevTools() : null);

const middleware = [thunk];
const getStore = (defaultConfig) =>
  createStore(
    getRootReducer(defaultConfig),
    compose(applyMiddleware(...middleware)),
    process.env.NODE_ENV !== "production" ? composeWithDevTools() : null
  );

export default getStore;
