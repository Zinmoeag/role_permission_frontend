import { loginApi } from "../../api";
import { useForm, SubmitHandler } from "react-hook-form"
import Input from "../../components/Input";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoginFormSchema } from "../../schema/AuthSchema";
import {z} from "zod";
import axiosClient from "../../axios/axiosClient";
import AuthFormComponent from "../../components/authFormComponent";
import ErrorComponent from "./components/errorComponent";
import { useEffect } from "react";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useAppStore } from "../../store/store";
import { setUser } from "../../store";
import { useNavigate } from "react-router-dom";

const SignIn = () => {

    const navigate = useNavigate();
    const {
        state :{
            user
        }, dispatch
    } = useAppStore() as any;

    const {
        isPending,
        mutate
    } = useMutation({
        mutationFn : (newData : any) => {
            return axiosClient.post(loginApi(), newData);
        },
        onSuccess : (res) => {
            dispatch(setUser(res.data.user));
            navigate("/dashboard");
        },
        onError : (err) => {
            if(err instanceof AxiosError){
                if(err?.response?.status === 422) {
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

    useEffect(() => {
        if(user){
            
        }
    },[user])

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