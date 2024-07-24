import { useQuery } from "@tanstack/react-query";
import axiosClient from "../axios/axiosClient";
import { healthCheckApi } from "../api";

const useHealtChecker = () => {
    const {
        isPending,
        data,
        error
      } = useQuery({
        queryKey : ["healthCheck"],
        queryFn : () => {
          return axiosClient.get(healthCheckApi());
        }
      })

    return {
        isPending,
        data,
        error,
    }
}

export default useHealtChecker;