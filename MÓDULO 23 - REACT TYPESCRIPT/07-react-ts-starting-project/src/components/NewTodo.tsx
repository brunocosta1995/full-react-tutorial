import { useRef } from "react";

const NewTodo = () => {

    const todoTextInputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    const enteredValue = todoTextInputRef.current!.value;

    if (enteredValue.trim().length === 0) {
        //throw error
        return;
    }

    
  };

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="text">Todo text</label>
      <input type="text" id="text" ref={todoTextInputRef}/>
      <button>Add Todo</button>
    </form>
  );
};

export default NewTodo;
