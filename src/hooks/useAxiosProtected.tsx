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
                        // setAuth({
                        //     user : data.user,
                        //     accessToken : data.accessToken,
                        // })
                        setAccessToken({
                            auth_access_token : data.accessToken
                        });
                        return axiosClient(prevRequest)
  
                    }catch(err : any){
                        return Promise.reject(error);
                    }
                }
            }
        )

        return () => {
            // console.log('clean up')
            axiosProtected.interceptors.request.eject(checkAccessToken);
            axiosProtected.interceptors.response.eject(checkAccessTokenResponse);
        }
    },[auth_access_token])

    return {
        axiosProtected
    }
}

export default useAxiosProtected;