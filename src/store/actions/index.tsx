import { Locals } from "../../context/LocalizationProvider";

const ActionsType = {
    SET_AUTH_USER : 'SET_AUTH_USER',
    SET_ACCESS_TOKEN : 'SET_ACCESS_TOKEN',
    SET_LOGOUT : "SET_LOGOUT",
    SET_LOCAL : "SET_LOCAL",
} as const;

export const setUser = (payload : any) => {
    return {
        type : ActionsType.SET_AUTH_USER, 
        payload : payload,
    }
}

export const setLogout = () => {
    return {
        type : ActionsType.SET_LOGOUT
    }
}

export const setAccessToken = (payload : {auth_access_token : string | null}) => {
    return {
        type : ActionsType.SET_ACCESS_TOKEN,
        payload : payload
    }
}

export const setLocal = (payload : Locals) => {
    return {
        type : ActionsType.SET_LOCAL,
        payload : payload
    }
}

export default ActionsType;