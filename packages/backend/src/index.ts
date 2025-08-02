import { z } from "zod";

export const signUpSchema = z.object({
    email: z.string().email(),
    password: z.string().min(8),
    name: z.string(),

});

export const loginSchema = z.object({
    email: z.string().email(),
    password: z.string().min(8),
});

export const roomSchema = z.object({
    roomName: z.string().min(3).max(10),
});
