import { PropsWithChildren, createContext, useEffect } from "react";
import { dataTagSymbol, useQuery } from "@tanstack/react-query";
import useAxiosProtected from "../hooks/useAxiosProtected";
import { getUser } from "../api";
import { setAccessToken, useAppStore } from "../store";
import { setUser } from "../store";
import { useCookies } from "react-cookie";
import AppError from "../utils/AppError";
import { StatusCode } from "../utils/Status";

const useAuthUser = () => {
    const {axiosProtected} = useAxiosProtected();
    const {state : {
        auth_access_token
    }} : any = useAppStore();
    
    const {
        data,
        isPending,
        isSuccess,
        isError,
    } = useQuery({
        queryKey : ["getUser"],
        queryFn : () => {
            return axiosProtected.get(getUser());
        },
        staleTime : 500,
        enabled : !!auth_access_token
    });

    return {
        isPending,
        isSuccess,
        isError,
        user : data?.data.user
    };
}

const authUserContext = createContext(null);

const AuthUserProvider = ({
    children
} : PropsWithChildren) => {

    const {isSuccess, isPending, isError, user} = useAuthUser();
    const {dispatch} : any = useAppStore();

    useEffect(() => {
        if(isSuccess){
            console.log("has user")
            dispatch(setUser(user));
            dispatch(setAccessToken({auth_access_token : user?.auth_access_token}));
        }else if(isError){
            console.log("no include user")
            dispatch(setUser(null));
            dispatch(setAccessToken({auth_access_token : null}));
        }
    },[isSuccess]);

    return children
}

export default AuthUserProvider;