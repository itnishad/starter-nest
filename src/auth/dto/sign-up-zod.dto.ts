import { z } from 'zod';
export const signUpSchema = z.object({
  username: z.string(),
  password: z.string(),
});

export type signUpDto = z.infer<typeof signUpSchema>;