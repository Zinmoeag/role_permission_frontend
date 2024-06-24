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