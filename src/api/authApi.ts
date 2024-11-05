import axiosClient from "../axios/axiosClient";
import { axiosProtected } from "../axios/axiosProtected";

export const getMe = async () => {
  return axiosProtected.get("/user");
};

export const genereateAccessToken = async () => {
  return await axiosClient.post("/refreshToken");
};
