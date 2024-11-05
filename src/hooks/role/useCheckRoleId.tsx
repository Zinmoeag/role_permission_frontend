import useDebounce from "../useDebounce";
import { useMutation } from "@tanstack/react-query";

const useCheckRoleId = () => {
  const [idValue, setIdValue] = useState("");

  const debouncedVal = useDebounce<string>(idValue, 1000);

    const { mutate, isPending } = useMutation({
        mutationKey: ["checkRoleExist"],
        mutationFn: (id: string) => {
          setCheckState(state.LOADING);
          return axiosClient.post(`/dashboard/role/checkid/${id}`);
        },
        onSuccess: (res) => {
          handleIsSuccess(res);
        },
        onError: (err) => {
          console.log(err);
        },
      });
    
      useEffect(() => {
        if (debouncedVal) {
          mutate(debouncedVal);
        }
      }, [debouncedVal]);
}

export default useCheckRoleId;