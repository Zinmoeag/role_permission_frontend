import { StatusCode } from "./Status";
import { Alert } from "@mui/material";

const ErrorHandler = ({statusCode} : {statusCode : StatusCode}) => {
    switch(statusCode){
        case StatusCode.Unauthorized :
            return <>access denied</>;

        case StatusCode.Forbidden : 
            return <Alert severity="error" color="error">Access Denied</Alert>
        case StatusCode.NotFound :
            return <>not found</>
        case StatusCode.InternalServerError :
            return <>InternalServerError</>
        default :
            return <>internal server error</>
    }
}  

export default ErrorHandler;