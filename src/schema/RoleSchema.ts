import {z} from "zod";

export const RoleFormSchema = z.object({
    role_id : z.string(),
    role_name : z.string().toUpperCase(),
});

