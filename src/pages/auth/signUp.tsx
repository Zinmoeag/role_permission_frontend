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
import { useAppStore } from "../../store";
import { SubmitHandler } from "react-hook-form";
import { RegisterFormSchema } from "../../schema/AuthSchema";
import { z } from "zod";
import Form from "../../features/form/Form";
import { useState } from "react";


const SignUp = () => {
    
    const navigate = useNavigate();
    const {
        dispatch
    } : any = useAppStore();

    const [returnError, setReturnError] = useState< Record<string, string>[] | null>(null);
    const [serverError, setServerError]= useState<string | null>(null);

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
                <Form
                    returnError={returnError}
                    schema={RegisterFormSchema}
                    onSubmit={onSubmit}
                 >
                    <div className="my-2">
                        <Form.TextInput 
                            className="my-2"
                            label="Name" 
                            name="name" 
                            placeholder="Enter your name"
                        />
                        <Form.TextInput 
                            className="my-2"
                            label="Email" 
                            name="email" 
                            placeholder="Enter your email"
                        />
                        <Form.PasswordInput 
                            className="my-2"
                            passwordToggler = {true}
                            label="Password" 
                            name="password" 
                            placeholder="password"
                        />
                        <Form.SubmitBtn 
                            text="Register" 
                        />
                    </div>
                </Form>
           </AuthFormComponent>
        </>
    )
}

export default SignUp;