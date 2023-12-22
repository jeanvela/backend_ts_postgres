import { z } from "zod";

export const bookCreatedSchema = z.object({
    body: z.object({
        title: z.string().min(4),
        author: z.string().min(4),
        rating: z.number().min(1).max(10)
    })
})

export const bookUpdateSchema = z.object({
    body: z.object({
        title: z.string().min(4),
        author: z.string().min(4).optional(),
        rating: z.number().min(1).max(10)
    }),
    params: z.object({
        id: z.string()
    })
})

export const bookRatingSchema = z.object({
    body: z.object({
        rating: z.number()
    }),
    params: z.object({
        id: z.string()
    })
})

export const bookDeletedSchema = z.object({
    params: z.object({
        id: z.string()
    })
})