import { TodoItem } from "./todoItemModel";
import { TodoList } from "./todoListModel";
import { User } from "./userModel";

(async () => {
  await User.sync();
  await TodoList.sync();
  await TodoItem.sync();
})();
