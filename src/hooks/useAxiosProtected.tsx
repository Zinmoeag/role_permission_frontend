import { axiosProtected } from "../axios/axiosProtected";
import { useEffect } from "react";
import axiosClient from "../axios/axiosClient";
import { ServerReturnAuth } from "../type";
import useRefreshToken from "./useRefreshToken";
import { setAccessToken, useAppStore } from "../store";

const useAxiosProtected = (accessToken = null) => {

    const token = accessToken;
    const {state : {
        auth_access_token 
    }} = useAppStore() as any;

    const {
        refresh
    } = useRefreshToken();

    useEffect(() => {
        const checkAccessToken = axiosProtected.interceptors.request.use(
            config => {
                if(!config.headers["Authorization"]){
                    config.headers["Authorization"] = "Bearer " + token
                }
                return config;
            }, (error) => Promise.reject(error)
        )

        const checkAccessTokenResponse = axiosProtected.interceptors.response.use(
            (response ) => {
                return response;
            },
            async (error) => {
                const prevRequest = error.config;
                if(error.response.status === 403){
                    try{
                        const data = await refresh() as ServerReturnAuth;
                        prevRequest.headers.Authorization = `Bearer ${data.accessToken}`;
                        setAccessToken({
                            auth_access_token : data.accessToken
                        });
                        return axiosClient(prevRequest)
  
                    }catch(err : any){
                        setAccessToken({
                            auth_access_token : null
                        });
                        return Promise.reject(error);
                    }
                }
            }
        )

        return () => {
            axiosProtected.interceptors.request.eject(checkAccessToken);
            axiosProtected.interceptors.response.eject(checkAccessTokenResponse);
        }
    },[])

    return {
        axiosProtected
    }
}

export default useAxiosProtected;