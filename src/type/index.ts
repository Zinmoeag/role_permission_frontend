export type Roles = "USER" | "ADMIN";

export interface AuthUser {
    id : string
    name : string
    email : string
    role_name : Roles
    roleId : string
}