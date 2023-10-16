import {FormEvent, useState} from 'react'
import { Todo } from '../types/todo';

const TodoFrom = () => {
  const [title, setTitle] = useState('')
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [todos, setTodos] = useState<Todo[]>([]);

  const addTodo = async (title: string) => {
    const res = await fetch("http://localhost:4000/todos", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({title: title})
    })
    if (!res.ok) {
      throw new Error('Failed to add todo');
    }

    const newTodo = await res.json();
    return newTodo;
  }

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const newTodo = await addTodo(title);
      setTodos(prevTodos => [...prevTodos, newTodo]);
      setTitle('');
    } catch(err) {
      console.log(err)
    }
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="New Todo"
      />
      <button type="submit">Add</button>
    </form>
    </div>
  )
}

export default TodoFrom