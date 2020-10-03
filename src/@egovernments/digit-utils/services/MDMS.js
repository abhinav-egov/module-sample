import Urls from "./urls";
import { Request } from "./utils";

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

const getCriteria = (criteriaType, tenantId) => {
  return {
    MdmsCriteria: {
      tenantId,
      moduleDetails: [
        {
          moduleName: "tenant",
          masterDetails: [{ name: "tenants" }, { name: criteriaType }],
        },
      ],
    },
  };
};

export const MdmsService = {
  init: (stateCode = "pb") =>
    Request({ url: Urls.MDMS, data: initRequestBody(stateCode), useCache: true, method: "POST", params: { tenantId: stateCode } }),
  call: (stateCode, criteria) =>
    Request({ url: Urls.MDMS, data: getCriteria(criteria, stateCode), useCache: true, method: "POST", params: { tenantId: stateCode } }),
};
