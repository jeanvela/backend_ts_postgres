import { z } from "zod";

export const signupSchema = z.object({
    body: z.object({
        name: z.string().min(4),
        email: z.string().email(),
        password: z.string().min(6)
    })
})

export const signinSchema = z.object({
    body: z.object({
        email: z.string().email(),
        password: z.string().min(6)
    })
})