import ActionsType from "../actions";

export type Store = {
    user : any,
    auth_access_token : string | null,
}

export type Actions = {
    type : ActionsTypeKind,
    payload? : any, 
}

export type ActionsTypeKind = typeof ActionsType[keyof typeof ActionsType];
