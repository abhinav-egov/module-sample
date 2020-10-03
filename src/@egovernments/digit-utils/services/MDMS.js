import Urls from "./urls";
import { GetCitiesWithi18nKeys, GetEgovLocations, Request } from "./utils";

const initRequestBody = (tenantId) => ({
  MdmsCriteria: {
    tenantId,
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
});

const getCriteria = ({ tenantId, moduleDetails }) => {
  return {
    MdmsCriteria: {
      tenantId,
      moduleDetails,
    },
  };
};

const transformResponse = (type, MdmsRes, moduleCode = "PGR") => {
  switch (type) {
    case "citymodule":
      return GetCitiesWithi18nKeys(MdmsRes, moduleCode);
    case "egovLocation":
      return GetEgovLocations(MdmsRes);
    default:
      break;
  }
};

export const MdmsService = {
  init: (stateCode = "pb") =>
    Request({ url: Urls.MDMS, data: initRequestBody(stateCode), useCache: true, method: "POST", params: { tenantId: stateCode } }),
  call: (details, stateCode = "pb") =>
    Request({ url: Urls.MDMS, data: getCriteria(details), useCache: true, method: "POST", params: { tenantId: stateCode } }),
  getDataByCriteria: async (mdmsDetails) => {
    const moduleCode = "PGR";
    const { MdmsRes } = await MdmsService.call(mdmsDetails.details);
    return transformResponse(mdmsDetails.type, MdmsRes, moduleCode);
  },
};
