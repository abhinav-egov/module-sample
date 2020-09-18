import {
  FETCH_CITIES,
  FETCH_LOCALITIES,
  FETCH_LOCALIZATION_KEYS_PGR,
  UPDATE_I18nStore_LOCALITY_PGR,
  FETCH_LOCALITY_LOCALIZATION_KEYS_PGR,
  UPDATE_I18nStore_CITY_PGR,
  FETCH_LANGUAGES,
} from "./types";
import { MdmsService } from "../../@egovernments/digit-utils/services/MDMS";
import { LocalizationService } from "../../@egovernments/digit-utils/services/Localization";
import { LocationService } from "../../@egovernments/digit-utils/services/Location";

export const fetchCities = () => async (dispatch, getState) => {
  let response = await MdmsService.init();
  dispatch({
    type: FETCH_CITIES,
    payload: response.MdmsRes.tenant.citymodule,
  });
};

export const fetchLocalities = (city) => async (dispatch) => {
  let response = await LocationService.getLocalities({ tenantId: `pb.${city.toLowerCase()}` });
  dispatch({
    type: FETCH_LOCALITIES,
    payload: { city, response: response.TenantBoundary[0] },
  });
};

export const getLocalizationKeyPGR = () => async (dispatch, getState) => {
  const lng = getState().currentLanguage.language || "en";
  const messages = await LocalizationService.getLocale({ modules: ["rainmaker-common", "rainmaker-pgr"], locale: lng, tenantId: "pb" });
  dispatch({
    type: FETCH_LOCALIZATION_KEYS_PGR,
    payload: messages,
  });
};

export const getLocalityKeysPGR = () => async (dispatch, getState) => {
  const lng = getState().currentLanguage.language || "en";
  const tenant = getState().localities.localityResponse.city;
  let messages = await LocalizationService.getLocale({ modules: [`rainmaker-pb.${tenant}`], locale: lng, tenantId: `pb.${tenant}` });
  if (messages.length === 0 && lng !== "en") {
    messages = await LocalizationService.getLocale({ modules: [`rainmaker-pb.${tenant}`], tenantId: `pb.${tenant}` });
  }
  dispatch({
    type: FETCH_LOCALITY_LOCALIZATION_KEYS_PGR,
    payload: messages,
  });
};

export const updateCityMapToi18n = () => (dispatch, getState) => {
  let { cities, pgrKeys, currentLanguage } = getState();
  dispatch({
    type: UPDATE_I18nStore_CITY_PGR,
    payload: { cities: cities.citiKeys, pgrKeys: pgrKeys.pgrKeys, currentLanguage: currentLanguage.language },
  });
};

export const updateLocalityMapToi18n = () => (dispatch, getState) => {
  let { currentLanguage, localities } = getState();
  let { code, city, localityData: boundries } = localities.localityResponse;
  let pgrKeys = localities.localityLocalizationKeysPGR;

  dispatch({
    type: UPDATE_I18nStore_LOCALITY_PGR,
    payload: { code, city, boundries, pgrKeys, currentLanguage: currentLanguage.language },
  });
};

export const fetchLanguages = () => async (dispatch, getState) => {
  let response = await MdmsService.init();
  dispatch({
    type: FETCH_LANGUAGES,
    payload: response.MdmsRes["common-masters"].StateInfo[0].languages,
  });
};
