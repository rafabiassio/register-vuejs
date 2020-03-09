import axios from "axios";
import store from "@/store";

const baseURL = process.env.VUE_APP_DB_HOST;

const http = axios.create({
  baseURL,
  headers: {
    "Content-Type": "application/json"
  }
});

http.interceptors.request.use(
  config => {
    store.commit("loader/setLoading", true);
    return config;
  },
  error => {
    store.commit("loader/setLoading", false);
    return Promise.reject(error);
  }
);

http.interceptors.response.use(
  response => {
    store.commit("loader/setLoading", false);
    return response;
  },
  error => {
    store.commit("loader/setLoading", false);
    return Promise.reject(error);
  }
);

export default http;
