import { useMemo } from "react";
import { useAppStore } from "../store";
import { z } from "zod";
import { AuthUser } from "../type";
import AppError from "../utils/AppError";
import { StatusCode } from "../utils/Status";

type Permission = {
    action : [string],
    resource : [string],
}

const usePermission = ({
    action,
    resource,
} : Permission) => {
    const {
        state : {
            user,
            auth_access_token
        }
    } = useAppStore() as any;
    
    const isAuthenticated = useMemo(() => (user && auth_access_token), [user, auth_access_token]);

    const permissions = (user as z.infer<typeof AuthUser>).permission;

    const isAllowed = permissions.some((permission => {
        return resource.includes(permission.resource) && action.includes(permission.action)
    }))

    if(!(isAuthenticated && isAllowed)){
        throw new AppError(StatusCode.Forbidden, "forbid")
    }
}

export default usePermission;