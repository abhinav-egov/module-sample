const Urls = {
  MDMS: (tenantId) => `/egov-mdms-service/v1/_search?tenantId=${tenantId}`,
  localization: (module, lng, tenantId) => `/localization/messages/v1/_search?module=${module}&locale=${lng}&tenantId=${tenantId}`,
  location: {
    localities: (tenantId) =>
      `/egov-location/location/v11/boundarys/_search?hierarchyTypeCode=ADMIN&boundaryType=Locality&tenantId=${tenantId.toLowerCase()}`,
  },
};

export default Urls;
