import Urls from "./urls";
import { Request } from "./utils";

export const LocationService = {
  getLocalities: ({ tenantId }) => {
    return Request({ url: Urls.location.localities(tenantId), cache: true });
  },
};
