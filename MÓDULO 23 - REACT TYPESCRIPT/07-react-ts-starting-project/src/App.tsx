import Todo from './models/todo';
import Todoslist from './components/Todolist';
import './App.css';

function App() {

  const todos = [
    new Todo('Learn React'),
    new Todo('Learn Typescript')

  ]

  return (
    <div>
      <Todoslist items={todos} />      
    </div>
  );
}

export default App;
