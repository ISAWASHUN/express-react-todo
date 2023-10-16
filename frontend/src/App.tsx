import { useEffect, useState } from 'react'
import './App.css'
import { Todo } from './types/todo';
import TodoFrom from './components/TodoFrom';

function App() {
  const [todos, setTodos] = useState<Todo[]>([])

  useEffect(() => {
    fetch("http://localhost:4000/todos").then(res => res.json()).then(data => setTodos(data));
  }, [])

  return (
    <>
      <h1>Todo List</h1>
      <ul>
        {todos.map(todo => (
          <li key={todo.id}>{todo.title}</li>
        ))}
      </ul>

      <p>Create new todo</p>
      <TodoFrom/>
    </>
  )
}

export default App
