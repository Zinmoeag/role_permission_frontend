import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import { Controller, useFormContext } from "react-hook-form";

type PasswordInputProps = {
    name : string,
    label : string,
    placeholder : string,
    passwordToggler : boolean,
    initialvalue ?: string | undefined
    className ?: string
};

export const PasswordInput : React.FC<PasswordInputProps> = (props) => {
    const form = useFormContext();
    const [showPassword, setShowPassword] = useState(false);
    
    return (
        <>
            <Controller
                name={props.name}
                control={form.control}
                render={({field : {onChange, value}}) => {
                    return (
                        <div className={props.className}>
                            <label>{props.label}</label>
                            <div className="flex border-b-2 border-slate-300"> 
                                <input 
                                    type={showPassword ? "text" : "password"}
                                    className="h-8 px-2 text-slate-400 outline-none w-full"
                                    placeholder={props.placeholder}
                                    value={value || ""}
                                    onChange={onChange}
                                    />
                                    {props.passwordToggler && (
                                        <button
                                            type="button"
                                            className="w-10"
                                            onClick={() => setShowPassword((prev) => props.passwordToggler && (!prev))}
                                        > <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />  
                                        </button>
                                    )}
                            </div>
                        </div>
                )}}
            />
        </>
    )
}
