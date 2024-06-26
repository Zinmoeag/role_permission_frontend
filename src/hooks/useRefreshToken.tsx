import axiosCient from "../axios/axiosClient";
import {AuthContextType, AuthType, useAuth} from "../context/authProvider";
import { RefreshTokenApi } from "../api";
import { AuthUser } from "../type";



const useRefreshToken = () => {
    const {
        auth,
        setAuth
    } = useAuth() as AuthContextType;

    const refresh = async () => {

        try {
            const res = await axiosCient.post(RefreshTokenApi());

            setAuth({
                ...auth,
                accessToken : res.data.accessToken
            } as AuthType<AuthUser>) 

            console.log(res)

        }catch(err){
            console.log(err)
        }
    }

    return {refresh};
}

export default useRefreshToken;