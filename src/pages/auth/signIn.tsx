import { loginApi } from "../../api";
import { SubmitHandler } from "react-hook-form"
import { LoginFormSchema } from "../../schema/AuthSchema";
import {z} from "zod";
import axiosClient from "../../axios/axiosClient";
import AuthFormComponent from "../../components/authFormComponent";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useAppStore } from "../../store/store";
import { setUser } from "../../store";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Form from "../../features/form/Form";


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

    const [returnError, setReturnError] = useState< Record<string, string>[] | null>(null);

    const {
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
                <div className="mb-4">
                    <Form
                        returnError={returnError}
                        onSubmit={onSubmit}
                        schema={LoginFormSchema}
                    >
                        <Form.TextInput
                            name="email"
                            placeholder="Enter your email"
                            className = "my-2"
                            label="Email"
                        />
                        <Form.PasswordInput
                            label="Password" 
                            name="password"
                            placeholder="Enter your password"
                            className = "my-2"
                            passwordToggler = {true}
                        />
                        <Form.SubmitBtn 
                            text="Login"
                        />
                    </Form>
                </div>
            </AuthFormComponent>
        </>
    )
}

export default SignIn