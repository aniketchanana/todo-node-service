import { object, string } from "yup";

export const validateCreateNewListRequest = object({
  listName: string().required(),
});
