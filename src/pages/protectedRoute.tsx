import { Roles } from "../type";
import { useAppStore } from "../store";
import { Navigate } from "react-router-dom";
import { PropsWithChildren, useMemo } from "react";
import AppError from "../utils/AppError";
import { StatusCode } from "../utils/Status";

const ProtectedRoute = ({
    allowedRoles,
    children,
} : PropsWithChildren<{
    allowedRoles : Roles[],
}>) => {
    const {
        state : {
            user,
            auth_access_token
        }
    } = useAppStore() as any;

    const isAuthenticated = useMemo((() => user && auth_access_token),[user,auth_access_token])

    if(!auth_access_token){
        return <Navigate to="/sign_in" replace />
    }

    if(user && !user.verify){
        return <Navigate to="/sign_in" replace />
    }

    if(isAuthenticated && !allowedRoles.includes(user?.role_name)){
        throw new AppError(StatusCode.Unauthorized, "unauthorized")
    }


    if(isAuthenticated && allowedRoles.includes(user?.role_name)){
        return <>
            {children}
        </>
    }
}

export default ProtectedRoute;