import AuthFormComponent from "../../components/authFormComponent";
import { SubmitHandler } from "react-hook-form";
import { RegisterFormSchema } from "../../schema/AuthSchema";
import { z } from "zod";
import Form from "../../features/form/Form";
import useSignUpHook from "../../hooks/auth/useSignUpHook";


const SignUp = () => {
    
   const {
        isPending,
        mutate,
        returnError,
   } = useSignUpHook();

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
                    loading = {isPending}
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