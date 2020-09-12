import Axios from "axios";

export const request = async (url, data, method = "GET") => {
  let headers = {};
  if (data) {
    headers = {
      "Content-Type": "application/json",
    };
  }

  const response = await Axios({
    method,
    url,
    headers,
    data,
  });

  return response;
};
