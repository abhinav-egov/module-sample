import { LocalizationService } from "./Localization";
import { MdmsService } from "./MDMS";
import { GetCitiesWithi18nKeys } from "./utils";

export const InitService = {
  defaultData: async (stateCode, moduleCode) => {
    const { MdmsRes } = await MdmsService.init(stateCode);
    const stateInfo = MdmsRes["common-masters"].StateInfo[0];
    let cities = GetCitiesWithi18nKeys(MdmsRes, moduleCode);

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
  criteriaData: async (stateCode, mdmsSource) => {
    const moduleCode = "PGR";
    const { MdmsRes } = await MdmsService.call(stateCode, mdmsSource);
    return GetCitiesWithi18nKeys(MdmsRes, moduleCode);
  },
};
