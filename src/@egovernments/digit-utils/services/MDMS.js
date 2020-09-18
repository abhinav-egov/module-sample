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

export const MdmsService = {
  init: (stateCode = "pb") =>
    Request({ url: Urls.MDMS, data: initRequestBody(stateCode), cache: true, method: "POST", params: { tenantId: stateCode } }),
};
