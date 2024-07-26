import { loginApi } from "../../api";
import { useForm, SubmitHandler } from "react-hook-form"
import Input from "../../components/Input";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoginFormSchema } from "../../schema/AuthSchema";
import {z} from "zod";
import axiosClient from "../../axios/axiosClient";
import AuthFormComponent from "../../components/authFormComponent";
import ErrorComponent from "./components/errorComponent";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useAppStore } from "../../store/store";
import { setUser } from "../../store";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const SignIn = () => {

    const navigate = useNavigate();
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
            console.log(res)
            if(res.data?.is_verfiy_email_sent){
                //if user is not verified, verify user account
                navigate('/verify')
                return;
            }
            // login success
            dispatch(setUser(res.data.usper));
            navigate("/dashboard");
        },
        onError : (err) => {
            if(err instanceof AxiosError){
                if(err?.response?.status === 422) {
                    if(err.response?.data?.errors){
                        Object.keys(err.response?.data?.errors).forEach((key) => {
                            setError(key, {
                                message : err.response?.data?.errors[key][0]
                            })
                        })  
                    }
                    setError('server_error', {
                        message : err.response.data.message
                    })
                }else{
                    setError('server_error', {
                        message : "Internal Server Error"
                    })
                }
            }
        }
    });

    const {
        register,
        handleSubmit,
        formState: { errors },
        setError,
    } = useForm({
        resolver : zodResolver(LoginFormSchema)
    });

    const onSubmit 
    : SubmitHandler<z.infer<typeof LoginFormSchema>> | any 
    = async (data : SubmitHandler<z.infer<typeof LoginFormSchema>>) => {
        mutate(data);
    }

    return (
        <>
            <AuthFormComponent
            component="LOGIN"
            >
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="flex flex-col gap-2 pb-4 border-b-2 mb-4">
                        <Input
                        label="Email" 
                        name="email" 
                        register={register}
                        errorMessage={errors.email?.message && errors.email?.message}
                        />
                        <Input 
                        label="Password" 
                        name="password" 
                        register={register}
                        errorMessage={errors.password?.message && errors.password?.message} 
                        />
                        {errors.server_error && (<ErrorComponent errorMessage={errors.server_error.message as string} />)}
                        <button
                        type="submit"
                        className="bg-blue-500 hover:bg-slate-950 py-2 text-slate-200 mt-1" 
                        disabled = {isPending}
                        >
                            {isPending ? "Loading..." : "Sign In"}
                        </button>
                    </div>
                </form>
            </AuthFormComponent>
        </>
    )
}

export default SignIn