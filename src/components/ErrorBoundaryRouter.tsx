import { useRouteError } from "react-router-dom";
import AppError from "../utils/AppError";
import { StatusCode } from "../utils/Status";

export default function ErrorBoundaryRouter(){
    let error = useRouteError() as Error | undefined

    if(error instanceof AppError){
        console.log(error)
        switch(error.message){
            case "500" :
                return <div>Internal server Error</div>
            case String(StatusCode.BadRequest) :
                return <div>Bad Request</div>
        }
    };

    return <div>Internal Server Error</div>
}