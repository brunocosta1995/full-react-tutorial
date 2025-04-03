class Todo {
  text: string;
  id: string;
  constructor(todoText: string) {
    this.id = new Date().toISOString();
    this.text = todoText;
  }
}

export default Todo;
