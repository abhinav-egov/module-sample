import { combineReducers } from "redux";
import ConfigActionTypes from "../../@egovernments/digit-utils/enums/ConfigActionTypes";
import {
  FETCH_CITIES,
  FETCH_LOCALITIES,
  FETCH_LOCALIZATION_KEYS_PGR,
  UPDATE_I18nStore_CITY_PGR,
  FETCH_LOCALITY_LOCALIZATION_KEYS_PGR,
  UPDATE_I18nStore_LOCALITY_PGR,
  CHANGE_LANGUAGE,
} from "../actions/types";
import {
  GetCityLocalizationKeysFromPGR,
  TransformData,
  GetCityLocalizationMap,
  GetLocalityLocalizationKeysFromPGR,
  GetLocalityDropDownList,
} from "../utils/pgrUtils";
import { runTimeTranslations } from "../../i18n";

const configReducer = (defaultConfig) => (state = defaultConfig, action) => {
  switch (action.type) {
    case ConfigActionTypes.CONFIG_UPDATE:
      return [...state, action.payload];
    default:
      return state;
  }
};

const langReducer = (defaltLanguages) => (state = defaltLanguages, action) => {
  switch (action.type) {
    default:
      return state;
  }
};

const formDataReducer = (state = {}, action) => {
  switch (action.type) {
    case "UPDATE_REPEAT":
      const stateKey = `${action.payload.field}-repeats`;
      const prevValue = state[stateKey] || 1;
      return { ...state, [stateKey]: prevValue + 1 };
    case "UPDATE_FEILD":
      return { ...state, [action.payload.field]: action.payload.value };
    default:
      return state;
  }
};

const cityReducer = (state = [], action) => {
  switch (action.type) {
    case FETCH_CITIES:
      let cityKeys = GetCityLocalizationKeysFromPGR(action.payload);
      return { ...state, citiKeys: [...cityKeys] };
    case UPDATE_I18nStore_CITY_PGR:
      let { cities, currentLanguage, pgrKeys } = action.payload;
      let cityKeyMap = GetCityLocalizationMap(cities, pgrKeys);
      runTimeTranslations(cityKeyMap, currentLanguage || "en");
      return {
        ...state,
        cityKeyMap,
      };
    default:
      return state;
  }
};

const localityReducer = (state = [], action) => {
  // console.log("action----------------------->", action);
  switch (action.type) {
    case FETCH_LOCALITIES:
      let tenantBoundry = action.payload.response;
      let code = tenantBoundry.tenantId.replace(".", "_").toUpperCase() + "_" + tenantBoundry.hierarchyType.code;
      return {
        ...state,
        localityResponse: {
          localityData: [...tenantBoundry.boundary],
          city: action.payload.city.toLowerCase(),
          code,
        },
      };
    case FETCH_LOCALITY_LOCALIZATION_KEYS_PGR:
      return {
        ...state,
        localityLocalizationKeysPGR: TransformData(action.payload),
      };
    case UPDATE_I18nStore_LOCALITY_PGR:
      const { code: cityCode, boundries, pgrKeys, currentLanguage } = action.payload;
      let localityLocalizationKeys = GetLocalityLocalizationKeysFromPGR(cityCode, boundries, pgrKeys);
      runTimeTranslations(localityLocalizationKeys, currentLanguage || "en");
      const localityList = GetLocalityDropDownList(localityLocalizationKeys);
      return { ...state, localityList: [...localityList] };
    default:
      return state;
  }
};

const PGRKeysReducer = (state = [], action) => {
  switch (action.type) {
    case FETCH_LOCALIZATION_KEYS_PGR:
      return { ...state, pgrKeys: TransformData(action.payload) };
    default:
      return state;
  }
};

const currentLanguage = (state = {}, action) => {
  switch (action.type) {
    case CHANGE_LANGUAGE:
      return { ...state, language: action.payload };
    default:
      return state;
  }
};

const getRootReducer = (defaultConfig, languageConfig) =>
  combineReducers({
    config: configReducer(defaultConfig),
    formData: formDataReducer,
    cities: cityReducer,
    localities: localityReducer,
    pgrKeys: PGRKeysReducer,
    currentLanguage,
    languages: langReducer(languageConfig),
  });

export default getRootReducer;
