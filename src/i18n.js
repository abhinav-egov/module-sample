import i18next from "i18next";
import HttpApi from "i18next-http-backend";
import { initReactI18next } from "react-i18next";

let options = {
  loadPath: "/locales/i18n/{{ns}}/pgr/{{lng}}.json",
  // loadPath: "http://localhost:8081/locale/{{ns}}/{{lng}}.json",
  // addPath: "http://localhost:8081/locales/add/{{lng}}/{{ns}}",

  crossDomain: true,
  requestOptions: {
    mode: "cors",
    credentials: "same-origin",
    cache: "default",
  },
  customHeaders: {
    "Access-Control-Allow-Origin": "*",
    "Content-Type": "application/json",
    Accept: "*/*",
  },
};

let i18nextConfig = {
  lng: "en",
  // resources,
  backend: options,
  fallbackLng: "en",
  debug: false,
  ns: ["translations"],
  defaultNS: "translations",
  keySeparator: false,
  saveMissing: false,
  saveMissingTo: "current",
  interpolation: {
    escapeValue: false,
    formatSeparator: ",",
  },
  react: {
    wait: true,
    useSuspense: true,
    bindI18n: "loaded",
    bindI18nStore: "added",
  },
};

export const runTimeTranslations = (runTimeData, lng) => {
  i18next.addResources(lng, i18nextConfig.ns[0], runTimeData);
};

i18next.use(initReactI18next).use(HttpApi).init(i18nextConfig);

export default i18next;
