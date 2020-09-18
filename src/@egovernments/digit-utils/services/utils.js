import Axios from "axios";

Axios.interceptors.request.use((req) => {
  console.log(`${req.method} ${req.url}`);
  document.body.classList.add("loader");
  return req;
});

Axios.interceptors.response.use((res) => {
  document.body.classList.remove("loader");
  return res;
});

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
