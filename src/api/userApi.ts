import axiosClient from "../axios/axiosClient";

export type UserParams = {
  page: string;
  limit: string;
  searchBy : string;
  searchValue : string;
  role : string;
  sort : string;
  sortBy : string;
};

export const getUsersApi = (params: UserParams) => {
    const stringParams = new URLSearchParams(params);
    return () => {
        return axiosClient.get(`/dashboard/users?${stringParams.toString()}`);
    }
};
