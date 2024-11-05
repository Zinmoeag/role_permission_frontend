import {
  axiosProtected,
  handleResponseOnFullfill,
  handleResponseOnReject,
} from "../axios/axiosProtected";
import { useEffect } from "react";
import useRefreshToken from "./useRefreshToken";

const useAxiosProtected = (accessToken = null) => {

  const { refresh } = useRefreshToken();

  useEffect(() => {
    const checkAccessTokenResponse = axiosProtected.interceptors.response.use(
      handleResponseOnFullfill,
      handleResponseOnReject
    );

    return () => {
      axiosProtected.interceptors.response.eject(checkAccessTokenResponse);
    };
  }, []);

  return {
    axiosProtected,
  };
};

export default useAxiosProtected;
