import AuthFormComponent from "../../components/authFormComponent";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, SubmitHandler } from "react-hook-form"
import Input from "../../components/Input";
import ErrorComponent from "./components/errorComponent";
// import axiosClient from "../axios/axiosClient";
import { RegisterFormSchema } from "../../schema/AuthSchema";
import axiosClient from "../../axios/axiosClient";
import { RegisterApi } from "../../api";
import { useAuth, AuthContextType } from "../../context/authProvider";

const SignUp = () => {

    const {auth, setAuth} = useAuth();
    
    const {
        register,
        handleSubmit,
        setError,
        formState: { errors },
    } = useForm({
        resolver : zodResolver(RegisterFormSchema)
    });

    const onSubmit  = async (data : any) => {
        axiosClient.post(RegisterApi(),data)
            .then(res => {
                setAuth({
                    user : {},
                    accessToken : res.data.accessToken   
                })
                console.log(auth)
            })
            .catch(err => {
                console.log(err)
            })
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
                        className="bg-blue-500 hover:bg-slate-950 py-2 text-slate-200 mt-1" 
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