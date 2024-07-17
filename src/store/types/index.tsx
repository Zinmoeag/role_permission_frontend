import ActionsType from "../actions";
import { AuthUser } from "../../type";
import {z} from "zod";
import { Themestypes } from "../../utils/Theme";

export type Store = {
    user : z.infer<typeof AuthUser> | null,
    auth_access_token : string | null,
    theme : Themestypes,
    local : "en" | "my"
}

export type Actions = {
    type : ActionsTypeKind,
    payload? : any, 
}

export type ActionsTypeKind = typeof ActionsType[keyof typeof ActionsType];
