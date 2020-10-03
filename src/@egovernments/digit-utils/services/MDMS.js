import Urls from "./urls";
import { GetCitiesWithi18nKeys, Request } from "./utils";

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

const getCriteria = (tenantId, moduleDetails) => {
  return {
    MdmsCriteria: {
      tenantId,
      moduleDetails,
    },
  };
};

const transformResponse = (type, MdmsRes, moduleCode) => {
  switch (type) {
    case "city":
      return GetCitiesWithi18nKeys(MdmsRes, moduleCode);
    default:
      break;
  }
};

export const MdmsService = {
  init: (stateCode = "pb") =>
    Request({ url: Urls.MDMS, data: initRequestBody(stateCode), useCache: true, method: "POST", params: { tenantId: stateCode } }),
  call: (stateCode, mdmsDetails) =>
    Request({ url: Urls.MDMS, data: getCriteria(stateCode, mdmsDetails), useCache: true, method: "POST", params: { tenantId: stateCode } }),
  getDataByCriteria: async (stateCode, mdmsDetails) => {
    const moduleCode = "PGR";
    const { MdmsRes } = await MdmsService.call(stateCode, mdmsDetails.details);
    return transformResponse(mdmsDetails.type, MdmsRes, moduleCode);
  },
};
