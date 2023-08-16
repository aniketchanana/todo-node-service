import { object, string } from "yup";

export const validateCreateNewListRequest = object({
  listName: string().required(),
});

export const getTodoListRequest = object({
  listId: string(),
});

export const validateTodoListUpdateRequest = object({
  updates: object({
    name: string(),
  }).required(),
  listId: string(),
});

export const validateDeleteTodoLisRequest = object({
  listId: string(),
});
