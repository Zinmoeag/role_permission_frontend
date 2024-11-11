import { useQuery } from "@tanstack/react-query";
import { getUsersApi } from "../../api/userApi";
import { UserParams } from "../../api/userApi";

const useUser = (params: UserParams) => {
  const query = useQuery({
    queryKey: [
      "users",
      "page=" + params.page,
      "limit=" + params.limit,
      "searchBy=" + params.searchBy,
      "searchValue=" + params.searchValue,
      "role=" + params.role || "",
      "sort="+params.sort || "",
      "sortBy="+params.sortBy || "",
    ],
    queryFn: getUsersApi(params),
    staleTime: 60 * 1000,
    select: (data) => data.data.users,
  });

  return query;
};

export default useUser;
