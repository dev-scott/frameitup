import { z } from "zod";

export const AuthCredentialsValidator = z.object({
  email: z.string().email(),
  password: z.string().min(8, {
    message: "Password must be at least 8 characters long.",
  }),
});

export type TAuthCredentialsValidator = z.infer<
  typeof AuthCredentialsValidator
>;

export const SendMailCredentialsValidator = z.object({
  name: z.string().min(2, {
    message: "Name must be at least 2 characters long.",
  }),
  email: z.string().email(),
  message: z.string().min(8, {
    message: "Message must be at least 8 characters long.",
  }),
});

export type TSendMailCredentialsValidator = z.infer<
  typeof SendMailCredentialsValidator
>;