import { combineReducers } from "redux"
import ConfigActionTypes from "../../@egovernments/digit-utils/enums/ConfigActionTypes";

const configReducer = defaultConfig => (state = defaultConfig, action) => {
  console.log(action);
  switch (action.type) {
    case ConfigActionTypes.CONFIG_UPDATE: return [...state, action.payload]
    default: return state;
  }
}

const formDataReducer = (state = {}, action) => {
  switch (action.type) {
    case "UPDATE_REPEAT":
      const stateKey = `${action.payload.field}-repeats`;
      const prevValue = state[stateKey] || 1;
      return { ...state, [stateKey]: prevValue + 1 }
    case "UPDATE_FEILD":
      return { ...state, [action.payload.field]: action.payload.value }
    default:
      return state;
  }
}


const getRootReducer = defaultConfig => combineReducers({
  config: configReducer(defaultConfig),
  formData: formDataReducer

})

export default getRootReducer;