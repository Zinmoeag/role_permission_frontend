import { useMemo } from "react";
import { useAppStore } from "../store";

const useAuthUser = () => {
    const {
        state : {
            user
        }
    } = useAppStore() as any;

    return {
        user : useMemo(() => {
            return user
        },[user]),
    };
}

export default useAuthUser;