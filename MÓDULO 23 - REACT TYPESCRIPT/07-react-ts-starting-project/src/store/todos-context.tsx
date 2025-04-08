import React from "react";
import Todo from "../models/todo";
import { useState } from "react";


type TodosTypeObj = {
  items: Todo[];
  addItem: (text: string) => void;
  removeItem: (id: string) => void
}

export const TodosContext = React.createContext<TodosTypeObj>({
  items: [],
  addItem: (text: string) => {},
  removeItem: (id: string) => {},
});

const TodosContextProvider: React.FC = (props) => {
  const [todos, setTodos] = useState<Todo[]>([]);

  const onAddTodoHandler = (todoText: string) => {
    const newTodo = new Todo(todoText);

    setTodos((prevArray) => {
      return prevArray.concat(newTodo);
    });
  };

  const onRemoveItemHandler = (id: string) => {
    setTodos((prevArray) => prevArray.filter((item) => item.id !== id));
  };

  const contextValue: TodosTypeObj = {
    items: todos,
    addItem: onAddTodoHandler,
    removeItem: onRemoveItemHandler,
  };

  return (
    <TodosContext.Provider value={contextValue}>
      {props.children}
    </TodosContext.Provider>
  );
};

export default TodosContextProvider;
