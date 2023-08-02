import axios from "axios";
import { BACKEND_SERVER_URL } from "constants/api.constant";

const admin = localStorage.getItem("admin");
const authData = JSON.parse(admin).auth;
const token = JSON.parse(authData).session.token;

const api = axios.create({
  baseURL: `${BACKEND_SERVER_URL}`,
});

// Add a request interceptor
api.interceptors.request.use(
  async function (config) {
    if (config.url !== "/admin/login") {
      config.headers = {
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
        "Content-Type": "application/json",
      };
    }

    // Do something before request is sent
    return config;
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error);
  }
);

// Add a response interceptor
api.interceptors.response.use(
  async function (response) {
    // Do something with response data
    const result = response.data;
    return result;
  },
  function (error) {
    // Do something with response error
    return Promise.reject(error);
  }
);

export default api;
