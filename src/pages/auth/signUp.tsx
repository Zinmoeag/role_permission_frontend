import AuthFormComponent from "../../components/authFormComponent";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form"
import Input from "../../components/Input";
import ErrorComponent from "./components/errorComponent";
import axiosClient from "../../axios/axiosClient";
import { RegisterApi } from "../../api";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { setUser } from "../../store";
import { useAppStore } from "../../store";
import { SubmitHandler } from "react-hook-form";
import { RegisterFormSchema } from "../../schema/AuthSchema";
import { z } from "zod";

const SignUp = () => {
    const {
        dispatch
    } : any = useAppStore();

    const {
        register,
        handleSubmit,
        setError,
        formState: { errors },
    } = useForm({
        resolver : zodResolver(RegisterFormSchema)
    });

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
                    setError('server_error', {
                        message : err.response.data.message
                    })
                }else{
                    setError("server_error", {
                        message : "Something went wrong. Please try again later."
                    })
                }
            }
        },
        onSuccess : (res) => {
            dispatch(setUser(res.data.user));
            navigate("/dashboard")
        }
    });

    const navigate = useNavigate();

    
    const onSubmit 
    : SubmitHandler<z.infer<typeof RegisterFormSchema>> | any 
    = async (data : SubmitHandler<z.infer<typeof RegisterFormSchema>>) => {
        mutate(data);
    }

    return (
        <>
           <AuthFormComponent
            component="SIGNUP"
           >
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="flex flex-col gap-2 pb-4 border-b-2 mb-4">
                        <Input
                        label="Name" 
                        name="name" 
                        register={register}
                        errorMessage={errors.name?.message && errors.name?.message}
                        />
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
                        className={`${isPending ? "bg-slate-600" : "bg-blue-500"} hover:bg-slate-950 py-2 text-slate-200 mt-1`} 
                        disabled = {isPending}
                        >
                            Register
                        </button>
                    </div>
                </form>    
           </AuthFormComponent>
        </>
    )
}

export default SignUp;