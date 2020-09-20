import { LocalizationService } from "./Localization";
import { MdmsService } from "./MDMS";
import { SortByName } from "./utils";

export const InitService = {
  defaultData: async (stateCode, moduleCode) => {
    const { MdmsRes } = await MdmsService.init(stateCode);
    const stateInfo = MdmsRes["common-masters"].StateInfo[0];
    const cityList = MdmsRes.tenant.citymodule.filter((module) => module.code === moduleCode)[0].tenants;
    const citiesMap = cityList.map((city) => city.code);
    const cities = MdmsRes.tenant.tenants
      .filter((city) => citiesMap.includes(city.code))
      .map(({ code, name, logoId, emailId, address, contactNumber }) => ({
        code,
        name,
        logoId,
        emailId,
        address,
        contactNumber,
        i18nKey: "TENANT_TENANTS_" + code.replace(".", "_").toUpperCase(),
      }))
      .sort((cityA, cityB) => {
        const na = cityA.name.toLowerCase(),
          nb = cityB.name.toLowerCase();
        return SortByName(na, nb);
      });

    const defaultData = {
      languages: stateInfo.hasLocalisation ? stateInfo.languages : [{ label: "ENGLISH", value: "en_IN" }],
      stateInfo: { code: stateInfo.code, name: stateInfo.name, logoUrl: stateInfo.logoUrl },
      cities,
    };

    defaultData.locales = await LocalizationService.getLocale({
      modules: ["rainmaker-common", `rainmaker-${moduleCode.toLowerCase()}`],
      locale: defaultData.languages[0].value,
      tenantId: stateCode,
    });

    return defaultData;
  },
};
