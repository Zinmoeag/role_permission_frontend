import axios, { AxiosError, AxiosResponse } from "axios";
import { genereateAccessToken } from "../api/authApi";
// import axiosClient from "./axiosClient";

export const axiosProtected = axios.create({
  baseURL: import.meta.env.VITE_SERVER_URL,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

export const handleResponseOnFullfill = (response: AxiosResponse) => response;

export const handleResponseOnReject = async (err : any) => {
  if (err.response?.status === 403) {
    try {
        genereateAccessToken();
        return axiosProtected(err.config);
    } catch (e) {
      Promise.reject(err);
    }
  }else{
    return Promise.reject(err)
  }
  
};

/**
 * handle bearer token authorization before the request send
 */

// axiosProtected.interceptors.request.use(
//   (config) => {
//     const access_token = localStorage.getItem("id");

//     console.log("access_token ===>", access_token);

//     config.headers["Authorization"] = "Bearer " + access_token;
//     return config;
//   },
//   (error) => Promise.reject(error)
// );

/**
 * intercept the response
 * Generate access token
 * when the response status is 403
 */
axiosProtected.interceptors.response.use(
  handleResponseOnFullfill,
  handleResponseOnReject
);
