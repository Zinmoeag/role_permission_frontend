export type Roles = "USER" | "ADMIN";
import {z} from "zod"

export const AuthUser = z.object({
    id : z.string(),
    name : z.string(),
    email : z.string().email(),
    roleId : z.number(),
    role_name : z.string(),
    avatar : z.string(),
    permission : z.array(z.object({
        id : z.number(),
        action : z.string(),
        resource : z.string(),
    }))
});

export type ServerReturnAuth = {
    access_token : string
    user : z.infer<typeof AuthUser>
}