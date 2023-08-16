export enum userEndpoints {
  root = "/auth",
  signIn = "/signin",
  signUp = "/signup",
  logout = "/logout",
  isValidSession = "/isValidSession",
}
export enum todoEndpoints {
  root = "/todo",

  createNewList = "/createNewList",
  getUserTodoList = "/getUserTodoList",
  updateTodoList = "/updateTodoList",
  deleteTodoList = "/deleteTodoList",

  createTodo = "/createTodo",
  getAllTodo = "/getAllTodo",
  updateTodo = "/updateTodo",
  deleteTodo = "/deleteTodo",
}
