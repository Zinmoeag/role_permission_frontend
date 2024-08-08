import { useAppStore } from "../../store";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import axiosClient from "../../axios/axiosClient";
import { loginApi } from "../../api";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { setUser } from "../../store";

const useSignInHook = () => {
    const navigate = useNavigate();
    const [returnError, setReturnError] = useState<Record<string, string>[] | null>(null);

    const {
        state : {
            user,
            auth_access_token
        },
        dispatch
    } = useAppStore() as any;

    useEffect(() => {
        if(auth_access_token && user){
            navigate("/dashboard")
        }
    },[auth_access_token, user])

    const {
        isPending,
        mutate
    } = useMutation({
        mutationFn : (newData : any) => {
            return axiosClient.post(loginApi(), newData);
        },
        onSuccess : (res) => {
            if(res.data?.is_verfiy_email_sent){
                //if user is not verified, verify user account
                navigate('/verify')
                return;
            }
            // login success
            dispatch(setUser(res.data.user));
            navigate("/dashboard");
        },
        onError : (err) => {
            if(err instanceof AxiosError){
                if(err?.response?.status === 422) {
                    if(err.response?.data?.errors){
                        const validationFailedErrors =  Object.keys(err.response?.data?.errors).map((key : string) => {
                            const errors = err.response?.data?.errors[key] as string;
                            return {
                                [key] : errors 
                            }
                        })
                        setReturnError(validationFailedErrors);
                    }
                }else{
                    setReturnError([{
                        server_error : "Something went wrong. Please try again later."
                    }])
                }
            }
        }
    });

 
    return {isPending, mutate, returnError};
}

export default useSignInHook;