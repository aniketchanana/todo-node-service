import { object, string } from "yup";

export const validateSignUpRequest = object({
  userDetails: object({
    name: string().required(),
    emailId: string().required(),
    password: string().required(),
  }).required(),
});

export const validateSignInRequest = object({
  emailId: string().required(),
  password: string().required(),
});
