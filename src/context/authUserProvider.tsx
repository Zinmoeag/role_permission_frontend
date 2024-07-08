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
            dispatch(setUser(user))
        }
    },[isSuccess])
    
    if(isPending) <div>loading</div>

    if(isError) throw new AppError(StatusCode.BadRequest, "Bad Request")
    
    if(isSuccess) {
        return children
    }
}

export default AuthUserProvider;