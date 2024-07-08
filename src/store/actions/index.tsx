const ActionsType = {
    SET_AUTH_USER : 'SET_AUTH_USER',
    SET_ACCESS_TOKEN : 'SET_ACCESS_TOKEN',
} as const;

export const setUser = (payload : any) => {
    return {
        type : ActionsType.SET_AUTH_USER, 
        payload : payload,
    }
}

export const setAccessToken = (payload : {auth_access_token : string}) => {
    return {
        type : ActionsType.SET_ACCESS_TOKEN,
        payload : payload
    }
}

export default ActionsType;