import { ErrorResponse, useRouteError } from "react-router-dom";
import { StatusCode } from "../utils/Status";
import NotFound from "./errors/NotFound";

export default function ErrorBoundaryRouter(){
    let error = useRouteError() as ErrorResponse | undefined

    switch(error?.status){
        case StatusCode.NotFound :
            return <NotFound/>
    }

    return <div>Internal Server Error</div>
}