import Axios from "axios";

export const Request = async ({ method = "POST", url, data = {}, cache = false }) => {
  let key = "";
  if (method.toUpperCase() === "POST") {
    data.RequestInfo = {
      apiId: "Rainmaker",
    };
  }
  if (cache) {
    key = `${method.toUpperCase()}.${url}.${JSON.stringify(data, null, 0)}`;
    const value = window.sessionStorage.getItem(key);
    if (value) {
      return JSON.parse(value);
    }
  }

  const res = await Axios({ method, url, data });
  if (cache) {
    window.sessionStorage.setItem(key, JSON.stringify(res.data));
  }

  return res.data;
};
