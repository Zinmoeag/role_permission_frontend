import { axiosProtected } from "../axios/axiosProtected";
import { useEffect } from "react";
import { AuthContextType, useAuth } from "../context/authProvider";
import axiosClient from "../axios/axiosClient";
import { ServerReturnAuth } from "../type";
import useRefreshToken from "./useRefreshToken";
import { redirect } from "react-router-dom";

const useAxiosProtected = () => {

    const {
        auth,
        setAuth
    } = useAuth() as AuthContextType;

    const {
        refresh
    } = useRefreshToken();

    useEffect(() => {
        const checkAccessToken = axiosProtected.interceptors.request.use(
            config => {
                if(!config.headers["Authorization"]){
                    config.headers["Authorization"] = "Bearer " + auth?.accessToken
                }
                return config;
            }, (error) => Promise.reject(error)
        )

        const checkAccessTokenResponse = axiosProtected.interceptors.response.use(
            response => {
                //still valid token
                return response
            },
            async (error) => {
                const prevRequest = error.config;
                if(error.response.status === 403){
                    try{
                        const data = await refresh() as ServerReturnAuth;
                        prevRequest.headers.Authorization = `Bearer ${data.accessToken}`;
                        setAuth({
                            ...data
                        })
                        return axiosClient(prevRequest)
  
                    }catch(err : any){
                        setAuth(null);
                        return Promise.reject(error);
                    }
                }
            }
        )

        return () => {
            axiosProtected.interceptors.request.eject(checkAccessToken);
            axiosProtected.interceptors.response.eject(checkAccessTokenResponse);
        }
    },[auth, redirect])

    return {
        axiosProtected
    }
}

export default useAxiosProtected;