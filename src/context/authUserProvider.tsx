import { PropsWithChildren, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { getMe } from "../api/authApi";
import { setUser } from "../store";
import { useAppStore } from "../store";
import PageLoader from "../components/PageLoader";

export const useAuthUser = () => {
  const { dispatch } = useAppStore();

  const query = useQuery({
    queryKey: ["authUser"],
    queryFn: getMe,
    select: (data) => data.data.user,
    staleTime: 500,
    retry: 1,
  });

  useEffect(() => {
    if (query.isSuccess) {
      dispatch(setUser(query.data));
    }else{
      dispatch(setUser(null));
    }
  }, [query.isSuccess, query.data, dispatch]);

  return query;
};

const AuthUserProvider = ({ children }: PropsWithChildren) => {
  const { isLoading, isFetching } = useAuthUser();

  if (isLoading || isFetching) return <PageLoader />;

  return children;
};

export default AuthUserProvider;
