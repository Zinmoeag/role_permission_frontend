import { useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import axiosClient from "../../axios/axiosClient";
import { RegisterApi } from "../../api";
import { useAppStore } from "../../store";
import { useState } from "react";

const useSignUpHook = () => {
    const navigate = useNavigate();
    const {
        dispatch
    } : any = useAppStore();

    const [serverError, setServerError]= useState<string | null>(null);
    const [returnError, setReturnError] = useState< Record<string, string>[] | null>(null);

    const {
        isPending,
        mutate
    } = useMutation({
        mutationFn : (newData : any) => {
            return axiosClient.post(RegisterApi(), newData)
        },
        onError : (err) => {
            if(err instanceof AxiosError){
                if(err?.response?.status === 409) {
                    setReturnError([{
                        form_error : err.response.data.message
                    }])
                }else{
                    setServerError("Something went wrong. Please try again later.")
                }
            }
        },
        onSuccess : (res) => {
            navigate('/verify')
        }
    });

    return {mutate, isPending, returnError, serverError}

}
export default useSignUpHook;