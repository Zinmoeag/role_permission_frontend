import { createContext, PropsWithChildren, useContext, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ZodSchema } from "zod";
import { TextInput, SubmitBtn, PasswordInput } from "./components";
import {z} from "zod"
import FormErrorCompoenent from "./components/FormErrorComponent";
import { useMemo } from "react";

const FormContext = createContext<any>(null);

type formProps<T extends ZodSchema<any>> = {
    schema : T,
    onSubmit : (data : z.infer<T>) => void,
    returnError : Record<string, string>[] | null,
    defaultValue ?: z.infer<T>,
}

const Form  = <T extends ZodSchema<any>> ({children, ...props} : PropsWithChildren<formProps<T>> ) => {

    const form = useForm({
        resolver : zodResolver(props.schema),
        defaultValues : props.defaultValue
    });

    const errorMessage = useMemo(() => {
        return form.formState.errors.form_error?.message
    }, [form.formState.errors.form_error])


    useEffect(() => {
        if(props.returnError != null){
            props.returnError.forEach((error) => {
                Object.entries(error).forEach(([key, value]) => {
                    form.setError((key as any), {message : value})
                })
            })
        }
    }, [props.returnError])


    return (
        <FormContext.Provider value={{...form}}>
            <form onSubmit={form.handleSubmit(props.onSubmit)}>
                {errorMessage && (
                   <FormErrorCompoenent
                        errorMessage={(errorMessage as string)}
                    />
                )}
                {children}
            </form>
        </FormContext.Provider>
    )    
}

Form.PasswordInput = PasswordInput;
Form.TextInput = TextInput;
Form.SubmitBtn = SubmitBtn;
export default Form;

export const useFormContext = () => useContext(FormContext)