import {
  FETCH_CITIES,
  FETCH_LOCALITIES,
  FETCH_LOCALIZATION_KEYS_PGR,
  UPDATE_I18nStore_LOCALITY_PGR,
  FETCH_LOCALITY_LOCALIZATION_KEYS_PGR,
  UPDATE_I18nStore_CITY_PGR,
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
  const response = await LocalizationService.getLocale({ module: "rainmaker-common,rainmaker-pgr", locale: lng, tenantId: "pb" });
  dispatch({
    type: FETCH_LOCALIZATION_KEYS_PGR,
    payload: response.messages,
  });
};

export const getLocalityKeysPGR = () => async (dispatch, getState) => {
  const lng = getState().currentLanguage.language || "en";
  const tenant = getState().localities.localityResponse.city;
  let response = await LocalizationService.getLocale({ module: `rainmaker-pb.${tenant}`, locale: lng, tenantId: `pb.${tenant}` });
  if (response.messages.length === 0 && lng !== "en") {
    response = await LocalizationService.getLocale({ module: `rainmaker-pb.${tenant}`, tenantId: `pb.${tenant}` });
  }
  dispatch({
    type: FETCH_LOCALITY_LOCALIZATION_KEYS_PGR,
    payload: response.messages,
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
