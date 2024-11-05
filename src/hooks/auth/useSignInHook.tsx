import { setAccessToken, useAppStore } from "../../store";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import axiosClient from "../../axios/axiosClient";
import { loginApi } from "../../api";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { setUser } from "../../store";
import { useAuthUser } from "../../context/authUserProvider";
import queryClient from "../../service/QueryClient";

const useSignInHook = () => {

  const [returnError, setReturnError] = useState<
    Record<string, string>[] | null
  >(null);

  const { isPending, mutate } = useMutation({
    mutationFn: (newData: any) => {
      return axiosClient.post(loginApi(), newData);
    },
    onSuccess: (res) => {
      //refetch user
      queryClient.refetchQueries({
        queryKey : ["authUser"],
      });
    },
    onError: (err) => {
      if (err instanceof AxiosError) {
        if (err?.response?.status === 422) {
          if (err.response?.data?.errors) {
            const validationFailedErrors = Object.keys(
              err.response?.data?.errors
            ).map((key: string) => {
              const errors = err.response?.data?.errors[key] as string;
              return {
                [key]: errors,
              };
            });
            setReturnError(validationFailedErrors);
          }
        } else {
          setReturnError([
            {
              server_error: "Something went wrong. Please try again later.",
            },
          ]);
        }
      }
    },
  });

  return { isPending, mutate, returnError };
};

export default useSignInHook;
