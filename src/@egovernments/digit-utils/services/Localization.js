import Urls from "./urls";
import { Request } from "./utils";

export const LocalizationService = {
  getLocale: ({ module, locale = "en_IN", tenantId }) => {
    if (locale.indexOf("_IN") === -1) {
      locale += "_IN";
    }
    return Request({ url: Urls.localization(module, locale, tenantId), cache: true });
  },
};
