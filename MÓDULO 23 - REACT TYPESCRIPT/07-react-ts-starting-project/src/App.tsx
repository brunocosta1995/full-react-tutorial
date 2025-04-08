import Todoslist from "./components/Todolist";
import "./App.css";
import NewTodo from "./components/NewTodo";
import TodosContextProvider from "./store/todos-context";

function App() {
  

  return (
    <TodosContextProvider>
      <NewTodo  />
      <Todoslist />
    </TodosContextProvider>
  );
}

export default App;
