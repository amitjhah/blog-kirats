import z from "zod";

export const signupinput = z.object({
    email:z.string().email(),
    password:z.string().min(4),
    name:z.string().optional()
})

export const signininput = z.object({
    username:z.string().email(),
    password:z.string().min(4)
})

export const createpostinput = z.object({
    title : z.string(),
    content :z.string()
})

export const updatepostinupt = z.object({
    title : z.string(),
    content :z.string()
})


export type Signupinput = z.infer<typeof signupinput>
export type Signininput = z.infer<typeof signininput>
export type Createpostinput = z.infer<typeof createpostinput>
export type Updatepostinput  = z.infer<typeof updatepostinupt>