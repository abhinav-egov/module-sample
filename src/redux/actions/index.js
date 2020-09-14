import {
  FETCH_CITIES,
  FETCH_LOCALITIES,
  FETCH_LOCALIZATION_KEYS_PGR,
  UPDATE_I18nStore_LOCALITY_PGR,
  FETCH_LOCALITY_LOCALIZATION_KEYS_PGR,
  UPDATE_I18nStore_CITY_PGR,
} from "./types";
import { request } from "../../common/api";
// import { TransformData } from "../utils/pgrUtils";

const RequestBody = {
  RequestInfo: {
    apiId: "Rainmaker",
    ver: ".01",
    ts: "",
    action: "_search",
    did: "1",
    key: "",
    msgId: "20170310130900|en_HI",
    authToken: "d01bef02-cf76-4b9d-8af0-22d68e862487",
  },
  MdmsCriteria: {
    tenantId: "pb",
    moduleDetails: [
      {
        moduleName: "common-masters",
        masterDetails: [{ name: "Department" }, { name: "Designation" }, { name: "StateInfo" }],
      },
      {
        moduleName: "tenant",
        masterDetails: [{ name: "tenants" }, { name: "citymodule" }],
      },
    ],
  },
};

const localityBody = {
  RequestInfo: {
    apiId: "Rainmaker",
    ver: ".01",
    ts: "",
    action: "",
    did: "1",
    key: "",
    msgId: "20170310130900|en_HI",
    authToken: "885d86b4-13f0-4415-a786-6270c9570955",
  },
};

//action creator
export const fetchCities = () => async (dispatch, getState) => {
  let response = await request("/egov-mdms-service/v1/_search?tenantId=pb.amritsar", RequestBody, "post");
  dispatch({
    type: FETCH_CITIES,
    payload: response.data.MdmsRes.tenant.citymodule,
  });
};

export const fetchLocalities = (city) => async (dispatch) => {
  let response = await request(
    `/egov-location/location/v11/boundarys/_search?hierarchyTypeCode=ADMIN&boundaryType=Locality&tenantId=pb.${city.toLowerCase()}`,
    localityBody,
    "post"
  );
  dispatch({
    type: FETCH_LOCALITIES,
    payload: { city, response: response.data.TenantBoundary[0] },
  });
};

export const getLocalizationKeyPGR = () => async (dispatch, getState) => {
  const lng = getState().currentLanguage.language ? getState().currentLanguage.language : "en";
  let data = {
    RequestInfo: {
      apiId: "Rainmaker",
      ver: ".01",
      ts: "",
      action: "_search",
      did: "1",
      key: "",
      msgId: "20170310130900|en_IN",
      authToken: "12855721-a7b7-4429-8bc9-f8fea9d0ad98",
    },
  };

  const response = await request(
    `/localization/messages/v1/_search?module=rainmaker-common,rainmaker-pgr&locale=${lng}_IN&tenantId=pb`,
    data,
    "post"
  );
  dispatch({
    type: FETCH_LOCALIZATION_KEYS_PGR,
    payload: response.data.messages,
  });
};

export const getLocalityKeysPGR = () => async (dispatch, getState) => {
  const lng = getState().currentLanguage.language ? getState().currentLanguage.language : "en";
  const tenant = getState().localities.localityResponse.city;
  // let lng = "en";
  let data = {
    RequestInfo: {
      apiId: "Rainmaker",
      ver: ".01",
      ts: "",
      action: "_search",
      did: "1",
      key: "",
      msgId: "20170310130900|en_IN",
      authToken: "12855721-a7b7-4429-8bc9-f8fea9d0ad98",
    },
  };
  let response = await request(
    `/localization/messages/v1/_search?module=rainmaker-pb.${tenant}&locale=${lng}_IN&tenantId=pb.${tenant}`,
    data,
    "post"
  );
  if (response.data.messages.length === 0 && lng !== "en") {
    response = await request(`/localization/messages/v1/_search?module=rainmaker-pb.${tenant}&locale=${"en"}_IN&tenantId=pb.${tenant}`, data, "post");
  }
  dispatch({
    type: FETCH_LOCALITY_LOCALIZATION_KEYS_PGR,
    payload: response.data.messages,
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
