import axios from "axios";

export const spotifyRequest = axios.create();

spotifyRequest.interceptors.request.use((config) => {

  config.headers["Content-Type"] = "application/x-www-form-urlencoded";
  config.headers.Authorization = "Bearer " + localStorage.getItem("token");

  return config;

});