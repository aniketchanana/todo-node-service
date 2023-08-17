import { TodoItem } from "./todoItemModel";
import { TodoList } from "./todoListModel";
import { User } from "./userModel";

(async () => {
  if (process.env.NODE_ENV === "development") {
    await User.sync({ force: true });
    await TodoList.sync({ force: true });
    await TodoItem.sync({ force: true });
  } else {
    await User.sync();
    await TodoList.sync();
    await TodoItem.sync();
  }
})();
