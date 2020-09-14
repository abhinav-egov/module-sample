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
import LanguageSelect from "../components/LanguageSelect";
//import { runTimeTranslations } from "../i18n";

const CityMohalla = ({ children, ...props }) => {
  let { t } = props;
  const dispatch = useDispatch();
  //const { t, i18n } = useTranslation();
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

  // useEffect(() => {
  //   i18n.changeLanguage("en");
  // }, [i18n]);

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
          <LanguageSelect />
          <Select
            id="inputGroupSelect01"
            label="City"
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
};

export default CityMohalla;
