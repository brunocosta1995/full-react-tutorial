import TodoItem from "./TodoItem";
import classes from "./Todolist.module.css";
import { useContext } from "react";
import { TodosContext } from "../store/todos-context";

const Todoslist: React.FC = () => {
  const todosContext = useContext(TodosContext);

  return (
    <ul className={classes.todos}>
      {todosContext.items.map((item) => (
        <TodoItem
          key={item.id}
          text={item.text}
          onRemoveItem={todosContext.removeItem.bind(null, item.id)}
        />
      ))}
    </ul>
  );
};

export default Todoslist;
