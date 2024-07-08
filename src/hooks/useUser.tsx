import { useEffect, useState } from "react";
import { useAuth } from "../context/authProvider";
import { axiosProtected } from "../axios/axiosProtected";
import { getUser } from "../api";
import { AuthUser } from "../type";

const useUser = () => {
    const {auth, setAuth} = useAuth() as any;
    const [idle, setIdle] = useState<
    {
        loading : boolean,
        user : AuthUser | null,
        error : any
    }
    >({
        loading : true,
        user : null,
        error : null
    })
    
    useEffect(() => {
        if(!auth?.user){
            axiosProtected(getUser())
                .then(res => (setAuth({
                    ...auth,
                    user : res.data.user
                })))
                .catch(err => {
                    setIdle({
                        loading : false,
                        user : null,
                        error : err
                    })
                })
            return;
        }else {
            setIdle({
                loading : false,
                user : auth.user,
                error : null
            })
        }
    },[auth?.user])

    return idle;
}

export default useUser;