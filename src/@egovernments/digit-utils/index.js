import mergeConfig from "./config/mergeConfig";
import { useStore } from "./services/index";
import { initI18n } from "./translations/index";

const initUtils = (Util, props) => {
  window.eGov = window.eGov || {};
  window.eGov[Util] = window.eGov[Util] || {};
  window.eGov[Util] = { ...window.eGov[Util], ...props };
};

initUtils("Config", { mergeConfig });
initUtils("Services", { useStore });
initUtils("Translation", { initI18n });
