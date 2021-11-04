import axios from "axios";
import { getToken } from "./Tokens";

export const apiGetRequest = (endpoint, token = null, props = {}) => {
  return apiRequest("GET", endpoint, token, props);
};

export const apiPostRequest = (endpoint, payload, token = null) => {
  return apiRequest("POST", endpoint, token, { data: payload });
};

export const apiPatchRequest = (endpoint, payload, token = null) => {
  return apiRequest("PATCH", endpoint, token, { data: payload });
};

export const apiPutRequest = (endpoint, payload, token = null) => {
  return apiRequest("PUT", endpoint, token, { data: payload });
};

export const apiDeleteRequest = (endpoint, payload, token = null) => {
  return apiRequest("DELETE", endpoint, token, { data: payload });
};

export const apiRequest = (method, endpoint, token = null, props = {}) => {
  if (!token) {
    token = getToken();
  }
  const params = {
    method: method,
    baseURL: process.env.REACT_APP_BASE_URL,
    url: endpoint,
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  };
  Object.assign(params, props);
  if (token) {
    params.headers.Authorization = `Bearer ${token}`;
  }

  return axios(params).catch((err) => err.response);
};
