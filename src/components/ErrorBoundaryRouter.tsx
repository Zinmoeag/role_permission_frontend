import { ErrorResponse, useRouteError } from "react-router-dom";
import { StatusCode } from "../utils/Status";
import NotFound from "./errors/NotFound";
import AppError from "../utils/AppError";
import AccessDenied from "../pages/errors/accessDenied";
import InternalServerError from "../pages/errors/internalServerError";

export default function ErrorBoundaryRouter(){
    let error = useRouteError() as ErrorResponse

    let errorStatus = 500;

    if(error instanceof AppError){
        errorStatus = Number(AppError.BreakMessage(error.message)[1])
    }else if(error?.status){
        errorStatus = error?.status
    }
    
    switch(errorStatus){
        case StatusCode.NotFound :
            return <NotFound/>
        case StatusCode.Forbidden : 
            return <AccessDenied />
        default : 
            return <InternalServerError />
    }
}