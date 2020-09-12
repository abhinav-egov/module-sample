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
import { useTranslation } from "react-i18next";
//import { runTimeTranslations } from "../i18n";

const CityMohalla = ({ children, ...props }) => {
  // console.log("state in city mohalla-->", state);
  const dispatch = useDispatch();
  const { t, i18n } = useTranslation();
  //const state = useSelector((state) => state);
  const citysKeyVal = useSelector((state) => state.cities);
  const pgrKeysVal = useSelector((state) => state.pgrKeys);
  const localities = useSelector((state) => state.localities);

  const getCities = useCallback(() => dispatch(fetchCities()), [dispatch]);

  const pgrKeys = useCallback(() => dispatch(getLocalizationKeyPGR()), [
    dispatch,
  ]);

  const updateCityMap = useCallback(() => dispatch(updateCityMapToi18n()), [
    dispatch,
  ]);

  const getLocalities = useCallback((city) => dispatch(fetchLocalities(city)), [
    dispatch,
  ]);

  const localityKeysPGR = useCallback(() => dispatch(getLocalityKeysPGR()), [
    dispatch,
  ]);

  const localityMapToi18n = useCallback(
    () => dispatch(updateLocalityMapToi18n()),
    [dispatch]
  );

  useEffect(() => {
    i18n.changeLanguage("en");
  }, [i18n]);

  useEffect(() => {
    getCities();
    pgrKeys();
  }, [getCities, pgrKeys]);

  const handleCityChange = (e) => {
    console.log(e.target.value);
    getLocalities(e.target.value);
  };

  useEffect(() => {
    if (citysKeyVal.citiKeys && pgrKeysVal.pgrKeys) {
      updateCityMap();
    }
  }, [citysKeyVal.citiKeys, pgrKeysVal.pgrKeys, updateCityMap]);

  useEffect(() => {
    if (localities.localityResponse) {
      localityKeysPGR();
    }
  }, [localities.localityResponse, localityKeysPGR]);

  useEffect(() => {
    if (localities.localityLocalizationKeysPGR) {
      localityMapToi18n();
    }
  }, [localities.localityLocalizationKeysPGR, localityMapToi18n]);

  return (
    <Fragment>
      {citysKeyVal.citiKeys && (
        <>
          <Select
            id="inputGroupSelect01"
            onChange={handleCityChange}
            options={citysKeyVal.citiKeys.map((city) => ({
              value: city.city,
              text: t(city.key),
            }))}
          ></Select>
          {localities.localityList && (
            <Select
              id="inputGroupSelect02"
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
