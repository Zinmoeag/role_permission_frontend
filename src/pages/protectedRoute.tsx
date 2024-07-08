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
            user
        }
    } = useAppStore() as any;

    return (
        (user && allowedRoles.includes(user?.role_name)) 
            ? (<Outlet /> ) 
            : (
            user 
                ? (<Navigate to="/notauthorized" replace />) 
                : (<Navigate to="/sign_in" replace />) 
            
        )       
    )
}

export default ProtectedRoute;