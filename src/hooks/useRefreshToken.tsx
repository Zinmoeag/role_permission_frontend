import axiosCient from "../axios/axiosClient";
import { RefreshTokenApi } from "../api";
import { ServerReturnAuth } from "../type";

const useRefreshToken = () => {
    const refresh = async () => {
        try {
            const {data} : {data : ServerReturnAuth} = await axiosCient.post(RefreshTokenApi());
            return data;
        }catch(err : any){
            throw new Error(err)
        }
    }

    return {refresh};
}

export default useRefreshToken;