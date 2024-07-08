import { useQuery } from "@tanstack/react-query";
import useAxiosProtected from "./useAxiosProtected";
import { getUser } from "../api";

const useAuthUser = () => {
    const {axiosProtected} = useAxiosProtected();

    const {
        isPending,
        isError,
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

export default useAuthUser;