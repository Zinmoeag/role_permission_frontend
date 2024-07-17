import { PropsWithChildren, createContext, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import useAxiosProtected from "../hooks/useAxiosProtected";
import { getUser } from "../api";
import { setAccessToken, useAppStore } from "../store";
import { setUser } from "../store";

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
        user : data?.data.user,
        auth_access_token,
    };
}

const AuthUserProvider = ({
    children
} : PropsWithChildren) => {

    const {isSuccess, isError, user, auth_access_token} = useAuthUser();
    const {dispatch} : any = useAppStore();

    useEffect(() => {
        if(isSuccess){
            dispatch(setUser(user));
            dispatch(setAccessToken({auth_access_token : auth_access_token}));
        }else if(isError){
            dispatch(setUser(null));
            dispatch(setAccessToken({auth_access_token : null}));
        }
    },[isSuccess, isError]);

    return children
}

export default AuthUserProvider;