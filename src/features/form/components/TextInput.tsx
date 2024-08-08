import { Controller } from "react-hook-form";
import { useFormContext } from "../Form";

type TextInputProps = {
    name : string,
    label : string,
    placeholder : string,
    className ?: string
}
export const TextInput : React.FC<TextInputProps> = (props) => {
    const form = useFormContext();
    return (
        <>
        <Controller 
            name = {props.name}
            control={form.control}
            render = {({field : {onChange, value}}) => (
                <>
                    <div
                        className={"flex flex-col w-full bg-white" +  " " + props.name}
                    >
                        <label>{props.label}</label>
                        <input
                            type="text" 
                            placeholder={props.placeholder}
                            className={"w-full h-8 px-2 text-slate-400 outline-none border-b-2 border-slate-300"} 
                            value = {value || ""}
                            onChange = {onChange}
                        />
                        {form.formState.errors[props.name] && <p className="text-red-500 text-sm py-1">{form.formState.errors[props.name]?.message}</p>}
                    </div>
                </>
            )}
        />
        </>
    )
}