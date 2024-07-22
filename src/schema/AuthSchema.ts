import {z} from "zod"

export const LoginFormSchema = z.object({
    email: z.string().email(),
    password: z.string().min(8),
})

export const RegisterFormSchema = z.object({
    name : z.string(),
    email : z.string().email(),
    password : z.string().min(8),
})

export const VerifyEmailSchema = z.object({
    verification_code : z.string().min(6)
})

export const AuthUser = z.object({
    id : z.string(),
    name : z.string(),
    email : z.string().email(),
    avatar : z.string(),
    roleId : z.number(),
    role_name : z.string(),
    permission : z.array(z.object({
        id : z.number(),
        action : z.string(),
        resource : z.string(),
    }))
});

