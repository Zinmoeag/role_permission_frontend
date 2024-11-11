export type Roles = "USER" | "ADMIN";
// export const AuthUser = z.object({
//     id : z.string(),
//     name : z.string(),
//     email : z.string().email(),
//     avatar : z.string(),
//     role_name : z.string(),
// });

export type AuthUser = {
    id : string,
    name : string,
    email : string,
    avatar : string,
    role_name : Roles
}

export type ServerReturnAuth = {
    access_token : string
    user : AuthUser
}