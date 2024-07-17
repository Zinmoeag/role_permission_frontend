import { Roles } from "../type";
import { useAppStore } from "../store";
import { Outlet, Navigate } from "react-router-dom";
import { useMemo } from "react";

const ProtectedRoute = ({
    allowedRoles,
} : {
    allowedRoles : Roles[],
}) => {
    const {
        state : {
            user,
            auth_access_token
        }
    } = useAppStore() as any;

    const isAuthenticated = useMemo((() => user && auth_access_token),[user,auth_access_token])

    return (
        (isAuthenticated && allowedRoles.includes(user?.role_name)) 
            ? (<Outlet />) 
            : (
            user
                ? (<Navigate to="/notauthorized" replace />) 
                : (<Navigate to="/sign_in" replace />) 
        )       
    )
}

export default ProtectedRoute;