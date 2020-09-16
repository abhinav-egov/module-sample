import React, { Fragment, useEffect, useCallback } from "react";
import Select from "../@egovernments/react-components/Select";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchCities,
  fetchLocalities,
  getLocalizationKeyPGR,
  updateCityMapToi18n,
  getLocalityKeysPGR,
  updateLocalityMapToi18n,
} from "../redux/actions";
// import { useTranslation } from "react-i18next";
import { useTranslation } from "react-i18next";
//import { runTimeTranslations } from "../i18n";

const CityMohalla = React.forwardRef(({ children, ...props }, ref) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const state = useSelector((state) => state);
  const citysKeyVal = useSelector((state) => state.cities);
  const pgrKeysVal = useSelector((state) => state.pgrKeys);
  const localities = useSelector((state) => state.localities);

  const getCities = useCallback(() => dispatch(fetchCities()), [dispatch]);

  const pgrKeys = useCallback(() => dispatch(getLocalizationKeyPGR()), [dispatch]);

  const updateCityMap = useCallback(() => dispatch(updateCityMapToi18n()), [dispatch]);

  const getLocalities = useCallback((city) => dispatch(fetchLocalities(city)), [dispatch]);

  const localityKeysPGR = useCallback(() => dispatch(getLocalityKeysPGR()), [dispatch]);

  const localityMapToi18n = useCallback(() => dispatch(updateLocalityMapToi18n()), [dispatch]);

  useEffect(() => {
    getCities();
    pgrKeys();
  }, [getCities, pgrKeys, state.currentLanguage]);

  useEffect(() => {
    if (citysKeyVal.citiKeys && pgrKeysVal.pgrKeys) {
      updateCityMap();
    }
  }, [citysKeyVal.citiKeys, pgrKeysVal.pgrKeys, updateCityMap, state.currentLanguage]);

  useEffect(() => {
    if (localities.localityResponse) {
      localityKeysPGR();
    }
  }, [localities.localityResponse, localityKeysPGR, state.currentLanguage]);

  useEffect(() => {
    if (localities.localityLocalizationKeysPGR) {
      localityMapToi18n();
    }
  }, [localities.localityLocalizationKeysPGR, localityMapToi18n, state.currentLanguage]);

  const handleCityChange = (e) => {
    getLocalities(e.target.value);
  };

  return (
    <Fragment>
      {citysKeyVal.citiKeys && (
        <>
          {/* <LanguageSelect /> */}
          {/* {t("welcomeMessage")} */}
          <Select
            id="inputGroupSelect01"
            label="City"
            ref={ref}
            name="city-select"
            onChange={handleCityChange}
            options={citysKeyVal.citiKeys.map((city) => ({
              value: city.city,
              text: t(city.key),
            }))}
          ></Select>
          {localities.localityList && (
            <Select
              id="inputGroupSelect02"
              label="Mohalla"
              ref={ref}
              name="locality-select"
              options={localities.localityList.map((locality) => ({
                value: locality.value,
                text: t(locality.key),
              }))}
            ></Select>
          )}
        </>
      )}
    </Fragment>
  );
});

export default CityMohalla;
