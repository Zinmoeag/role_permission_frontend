import { useAuth } from "../context/authProvider"
import { Outlet } from "react-router-dom";
import { Navigate } from "react-router-dom";
import { Roles } from "../type";
import { AuthContextType } from "../context/authProvider";

const ProtectedRoute = ({
    allowedRoles,
} : {
    allowedRoles : Roles[],
}) => {
    const {
        auth,
    } = useAuth() as AuthContextType;

    return (
        (auth?.user?.role_name && allowedRoles.includes(auth?.user?.role_name)) 
        ? (<Outlet /> ) 
        : (
            auth?.user ? (
                <Navigate to="/notFound" replace />
            ) : (
                <Navigate to="/sign_in" replace />
            ) 
        )
    )
}

export default ProtectedRoute;