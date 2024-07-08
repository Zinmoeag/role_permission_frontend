import { PropsWithChildren, createContext } from "react";
import { useQuery } from "@tanstack/react-query";
import useAxiosProtected from "../hooks/useAxiosProtected";
import { getUser } from "../api";

const useAuthUser = () => {
    const {axiosProtected} = useAxiosProtected();

    const {
        data
    } = useQuery({
        queryKey : ["getUser"],
        queryFn : () => {
            return axiosProtected.get(getUser());
        },
        staleTime : 3000
    });

    return {
        data
    };
}

const authUserContext = createContext(null);

const AuthUserProvider = ({
    children
} : PropsWithChildren) => {

    useAuthUser();

    return (
        <authUserContext.Provider value={null}>
            {children}
        </authUserContext.Provider>  
    )
}

export default AuthUserProvider;