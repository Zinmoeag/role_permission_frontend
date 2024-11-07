import { StatusCode } from "./Status";
import { Alert } from "@mui/material";

const ErrorHandler = ({statusCode} : {statusCode : StatusCode}) => {
    switch(statusCode){
        case StatusCode.Unauthorized :
            return <Alert severity="error" color="error">You Are Not Authorized</Alert>;
        case StatusCode.Forbidden : 
            return <Alert severity="error" color="error">Access Denied</Alert>
        case StatusCode.NotFound :
            return <Alert severity="error" color="error">Resource Not Found</Alert>
        case StatusCode.InternalServerError :
            return <Alert severity="error" color="error">Internal Server Error</Alert>
        default :
            return <Alert severity="error" color="error">Internal Server Error</Alert>
    }
}  

export default ErrorHandler;