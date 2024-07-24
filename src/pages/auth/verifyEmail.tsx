import Input from "../../components/Input";
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { useMutation } from "@tanstack/react-query";
import axiosClient from "../../axios/axiosClient";
import { useNavigate } from "react-router-dom";
import { VerifyEmailApi } from "../../api";
import { VerifyEmailSchema } from "../../schema/AuthSchema";
import { AxiosError } from "axios";

type params = {
    verificationCode : string
}

const VerifyEmail = () => {
    const {verificationCode} = useParams<params>();
    const navigate = useNavigate();
    const {
        register,
        handleSubmit,
        setValue,
        setError,
        formState: { errors },
    } = useForm({
        resolver : zodResolver(VerifyEmailSchema)
    });

    const {
        mutate
    } = useMutation({
        mutationFn : (data : any) => {
            return axiosClient.post(VerifyEmailApi(), data)
        },
        onSuccess : () => {
            navigate("/sign_in")
        },  
        onError : (err) => {
            console.log(err)
            if(err instanceof AxiosError){
                if(err.response?.status === 400){
                    setError("verficationFailed", {
                        message : err.response.data.message as string
                    })
                    return;
                }
            }else{
                setError("verficationFailed", {
                    message : "Internal Server Error"
                })
            }
        }
    })

    useEffect(() => {
        setValue("verification_code", verificationCode)
    },[])

    const onSubmit = (cleanData : any) => {
        mutate(cleanData);
    }

    return (
        <div>
            <main className="h-screen flex items-center justify-center">
                <div className=" w-[25rem] bg-white py-8 px-4 rounded-lg">
                    <h3 className="text-slate-600 uppercase text-2xl font-bold mb-4">Verify Your Account</h3>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="flex flex-col gap-2 pb-4 border-b-2 mb-4">
                            <Input
                            label="Verification Code" 
                            name="verification_code"
                            register={register}
                            errorMessage={errors.verification_code?.message && errors.verification_code?.message}
                            />
                            <button
                            type="submit"
                            className="bg-blue-500 hover:bg-slate-950 py-2 text-slate-200 mt-1" 
                            >
                                verify
                            </button>
                        </div>
                        {errors?.verficationFailed?.message && <p className="text-red-500 text-sm text-center error_block">{(errors?.verficationFailed?.message as string)}</p>}
                    </form>
                </div>
            </main>
        </div>
    )
}
export default VerifyEmail;