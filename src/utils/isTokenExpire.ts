import { jwtDecode } from "jwt-decode"

const isTokenExpire = (
    token : string, 
    expireTime : number
) => {
    const {exp} : any= jwtDecode(token);
    const time = expireTime * 1000;

    const expIn = exp  * 1000 - Date.now();
    if(expIn < time){
        return true;
    }else{
        return false
    }

}

export default isTokenExpire;