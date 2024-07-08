import { Outlet } from "react-router-dom";
import { Roles } from "../type";
import { Navigate } from "react-router-dom";
import { useAppStore } from "../store";

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

    return (
        (user && allowedRoles.includes(user?.role_name)) 
            ? (<Outlet /> ) 
            : (
            auth_access_token
                ? (<Navigate to="/" replace />) 
                : (<Navigate to="/sign_in" replace />) 
        )       
    )
}

export default ProtectedRoute;