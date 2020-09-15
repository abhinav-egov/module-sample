import Urls from "./urls";
import { Request } from "./utils";

const initRequestBody = {
  MdmsCriteria: {
    tenantId: "pb",
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
};

export const MdmsService = {
  init: () => Request({ url: Urls.MDMS("pb"), data: initRequestBody, cache: true, method: "POST" }),
};
