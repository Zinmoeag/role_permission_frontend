import { Store } from "../types";
import {InitailAppState} from "../store";
import { Actions } from "../types";
import ActionsType from "../actions";

const reducer = (state : Store , action : Actions) : Store => {
    switch(action.type){
        case ActionsType.SET_AUTH_USER :
            return {
                ...state,
                user : action.payload
            }
        case ActionsType.SET_ACCESS_TOKEN :
            return {
                ...state,
                auth_access_token : action.payload.auth_access_token
            }
        default :
            return state;
    }
}

export default reducer;