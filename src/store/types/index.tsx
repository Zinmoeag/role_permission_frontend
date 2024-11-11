import ActionsType from "../actions";
import { AuthUser } from "../../type";
import { Themestypes } from "../../utils/Theme";

export type Store = {
    user : AuthUser | null,
    theme : Themestypes,
    local : "en" | "my"
}

export type Actions = {
    type : ActionsTypeKind,
    payload? : any, 
}

export type ActionsTypeKind = typeof ActionsType[keyof typeof ActionsType];
