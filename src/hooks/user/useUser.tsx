import { useQuery } from "@tanstack/react-query";
import { getUsersApi } from "../../api/userApi";
import { UserParams } from "../../api/userApi";


const useUser = (params : UserParams) => {
    console.log(params);
    const query = useQuery({
        queryKey: ["users", "page="+params.page, "limit="+params.limit],
        queryFn: getUsersApi(params),
        staleTime :  60 * 1000,
        select : (data) => data.data.users
    });

    return query;
}

export default useUser;