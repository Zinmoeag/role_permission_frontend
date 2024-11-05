import axiosClient from "../axios/axiosClient";

export const getRoles = () => {
  return axiosClient.get("/dashboard/roles");
};
