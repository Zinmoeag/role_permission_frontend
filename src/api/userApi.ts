import axiosClient from "../axios/axiosClient";

export type UserParams = {
  page: number;
  limit: number;
};

export const getUsersApi = (params: UserParams) => {
    const stringParams = new URLSearchParams(params);

    console.log(stringParams.toString());
    return () => {
        return axiosClient.get(`/dashboard/users?${stringParams.toString()}`);
    }
};
