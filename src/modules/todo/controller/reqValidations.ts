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
  listId: string().required(),
}).required();

export const validateDeleteTodoLisRequest = object({
  listId: string().required(),
}).required();

export const validateCreateTodoItemRequest = object({
  text: string().required(),
  listId: string().required(),
})
  .required()
  .noUnknown();

export const validateUpdateTodoItemRequest = object({
  updates: object({
    text: string(),
  })
    .noUnknown()
    .required(),
  listId: string().required(),
  todoId: string().required(),
}).required();

export const validateDeleteTodoItemRequest = object({
  listId: string().required(),
  todoId: string().required(),
})
  .required()
  .noUnknown();
