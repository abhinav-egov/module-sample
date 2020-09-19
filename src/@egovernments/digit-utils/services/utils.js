import Axios from "axios";
import { Storage } from "./Storage";

Axios.interceptors.request.use((req) => {
  document.body.classList.add("loader");
  return req;
});

Axios.interceptors.response.use((res) => {
  document.body.classList.remove("loader");
  return res;
});

export const Request = async ({ method = "POST", url, data = {}, cache = false, params = {} }) => {
  let key = "";
  if (method.toUpperCase() === "POST") {
    data.RequestInfo = {
      apiId: "Rainmaker",
    };
  }
  if (cache) {
    key = `${method.toUpperCase()}.${url}.${JSON.stringify(params, null, 0)}.${JSON.stringify(data, null, 0)}`;
    const value = Storage.get(key);
    if (value) {
      return value;
    }
  } else {
    params._ = Date.now();
  }

  const res = await Axios({ method, url, data, params });
  if (cache) {
    Storage.set(key, res.data);
  }

  return res.data;
};

export const SortByName = (na, nb) => {
  if (na < nb) {
    return -1;
  }
  if (na > nb) {
    return 1;
  }
  return 0;
};

export const TransformArrayToObj = (traslationList) => {
  return traslationList.reduce(
    // eslint-disable-next-line
    (obj, item) => ((obj[item.code] = item.message), obj),
    {}
  );
  // return trasformedTraslation;
};
