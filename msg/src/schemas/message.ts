import  { z } from "zod"

export const messageSchema = z.object({
    content: z
        .string()
        .min(10, "Message must be at least 10 character")
        .max(100, "Message must be at most 100 characters"),
})