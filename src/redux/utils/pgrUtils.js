export const GetCityLocalizationKeysFromPGR = (cityTenants) => {
  let cityDropDownList = GetCityLocatizationKeys(
    cityTenants.filter((tenant) => {
      return tenant.code === "PGR";
    })[0]
  );
  return cityDropDownList;
};

export const GetCityLocalizationMap = (cityKeys, pgrKeys) => {
  if (cityKeys && pgrKeys) {
    return cityKeys.reduce((obj, item) => {
      return { ...obj, [item.key]: pgrKeys[item.key] };
    }, {});
  }
  return null;
};

const GetCityLocatizationKeys = (citykeys) => {
  let keys = [];
  let city = "";
  citykeys.tenants.forEach((tenant) => {
    let code = tenant.code.replace(".", "_").toUpperCase();
    city = code.split("_")[1];
    keys.push({ city, key: "TENANT_TENANTS_" + code });
  });
  return keys;
};

export const GetLocalityLocalizationKeysFromPGR = (
  code,
  boundaries,
  pgrKeys
) => {
  let key = "";
  return boundaries.reduce((obj, item) => {
    key = code + "_" + item.code;
    return { ...obj, [key]: pgrKeys[key] };
  }, {});
};

export const GetLocalityDropDownList = (localitiesMap) => {
  let localityNames = [];
  for (let key in localitiesMap) {
    localityNames.push({ key, value: localitiesMap[key] });
  }
  return localityNames;
};

export const TransformData = (traslationList) => {
  let trasformedTraslation = traslationList.reduce(
    // eslint-disable-next-line
    (obj, item) => ((obj[item.code] = item.message), obj),
    {}
  );
  return trasformedTraslation;
};
