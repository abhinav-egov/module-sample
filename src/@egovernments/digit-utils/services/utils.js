import Axios from "axios";
import { Storage } from "./Storage";

Axios.interceptors.request.use((req) => {
  console.log(`${req.method} ${req.url}`);
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
    key = `${method.toUpperCase()}.${url}.${JSON.stringify(data, null, 0)}`;
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
