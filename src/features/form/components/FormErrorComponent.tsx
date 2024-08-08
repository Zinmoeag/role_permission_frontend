import { useFormContext } from "../Form";
import { memo } from "react";

const FormErrorCompoenent = memo(({errorMessage} : {errorMessage : string}) => {
    return (
        <div className="bg-red-100 my-2 py-2">
            <p className="text-red-500 text-center">{errorMessage}</p>
        </div>
    )
})
export default FormErrorCompoenent;