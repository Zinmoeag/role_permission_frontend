import { Store } from "../types";
import { Actions } from "../types";
import ActionsType from "../actions";

const reducer = (state : Store , action : Actions) : Store => {
    switch(action.type){
        case ActionsType.SET_AUTH_USER :
            return {
                ...state,
                isLoggIn : true,
                user : action.payload
            }
        case ActionsType.SET_ACCESS_TOKEN :
            return {
                ...state,
                auth_access_token : action.payload.auth_access_token
            }
        case ActionsType.SET_LOGOUT :
            return {
                ...state,
                isLoggIn : false,
                user : null,
                auth_access_token : null,
            }
        case ActionsType.SET_LOCAL : 
            console.log(action.payload)
            return {
                ...state,
                local : action.payload
            }
        case ActionsType.SET_THEME : 
            return {
                ...state,
                theme : action.payload
            }
        default :
            return state;
    }
}

export default reducer;