
const Input = ({
    label,
    name,
    register,
    validation = null,
    errorMessage = null,
} : {
    label : string,
    name : string,
    register : any,
    validation? : object | null,
    errorMessage? : any,
    valus ?: string | null
}) => {
    return (
        <>
         <div className="flex flex-col w-full bg-white">
            <label htmlFor={name} className="text-sm">{label}</label>
            <input 
            className="h-8 px-2 text-slate-400 outline-none border-b-2 border-slate-300"
            placeholder={"Enter your" + " " + label}
            type="text"
            {...register(name,{...(validation && validation)})}
            />
            {
                errorMessage && <p className="text-red-500 text-sm py-1">{errorMessage}</p>
            }
         </div>
        </>
    )
}

export default Input;