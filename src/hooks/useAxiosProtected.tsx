import { axiosProtected } from "../axios/axiosProtected";
import { useEffect } from "react";
import { AuthContextType, useAuth } from "../context/authProvider";
import axiosClient from "../axios/axiosClient";
import { RefreshTokenApi } from "../api";
import { ServerReturnAuth } from "../type";

const useAxiosProtected = () => {

    const {
        auth,
        setAuth
    } = useAuth() as AuthContextType;

    useEffect(() => {
        const checkAccessToken = axiosProtected.interceptors.request.use(
            config => {
                console.log("request")
                console.log(config.headers["Authorization"])
                if(!config.headers["Authorization"]){
                    console.log("set net bearer token")
                    config.headers["Authorization"] = "Bearer " + auth?.accessToken + "d"
                }
                return config;
            }, (error) => Promise.reject(error)
        )

        const checkAccessTokenResponse = axiosProtected.interceptors.response.use(
            response => {
                console.log("still avalable")
                return response
            },
            async (error) => {
                // console.log(error.config)
                const prevRequest = error.config;
                if(error.response.status === 403){
                    try{
                        console.log("needa generate againg")
                        //get access token by refresh token
                        const {data} : {data : ServerReturnAuth} = await axiosClient.post(RefreshTokenApi());
                        console.log("new access token")
                        setAuth({
                            accessToken : data.accessToken,
                            user : data.user
                        })
                        prevRequest.headers['Authorization'] = `Bearer ${data.accessToken}`;
                        return axiosClient(error?.config)
  
                    }catch(err : any){
                        if(err.response.status === 403){
                            console.log("invalid refreh token")
                            setAuth(null);   
                        }
                        return Promise.reject(error);
                    }
                }

            }
        )

        return () => {
            console.log("clean up")
            axiosProtected.interceptors.request.eject(checkAccessToken);
            axiosProtected.interceptors.response.eject(checkAccessTokenResponse);
        }
    },[auth])

    return {
        axiosProtected
    }
}

export default useAxiosProtected;