import React, { Fragment, useCallback } from "react";
import Select from "../@egovernments/react-components/Select";
import { useDispatch, useSelector } from "react-redux";
import { fetchLocalities } from "../redux/actions";
import { useTranslation } from "react-i18next";

const CityMohalla = React.forwardRef(({ children, ...props }, ref) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const state = useSelector((state) => state);
  const localities = useSelector((state) => state.localities);
  const getLocalities = useCallback((city) => dispatch(fetchLocalities(city)), [dispatch]);

  const handleCityChange = (e) => {
    getLocalities(e.target.value);
  };

  return (
    <Fragment>
      {state.cities && (
        <>
          <Select
            label="City"
            id="inputGroupSelect01"
            ref={ref}
            name="city-select"
            onChange={handleCityChange}
            options={state.cities.map((city) => ({
              value: city.name,
              text: t(city.i18nKey),
            }))}
          ></Select>
          {localities && localities.localityList && (
            <Select
              label="Mohalla"
              id="inputGroupSelect02"
              ref={ref}
              name="locality-select"
              options={localities.localityList.map((locality) => ({
                value: locality.name,
                text: t(locality.i18nkey),
              }))}
            ></Select>
          )}
        </>
      )}
    </Fragment>
  );
});

export default CityMohalla;
