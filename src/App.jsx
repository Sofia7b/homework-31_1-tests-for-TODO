import React, { useState } from 'react';
import TodoItem from './components/TodoItem.jsx';

export default function App() {
  const [todos, setTodos] = useState([]);
  const [text, setText] = useState('');
  const [error, setError] = useState('');

  function addTodo() {
    if (!text.trim()) {
      setError('Поле не може бути порожнім');
      return;
    }
    const newTodo = {
      id: crypto.randomUUID?.() ?? String(Date.now()),
      text: text.trim(),
      completed: false
    };
    setTodos((prev) => [newTodo, ...prev]);
    setText('');
    setError('');
  }

  function toggleTodo(id) {
    setTodos((prev) =>
      prev.map((t) =>
        t.id === id ? { ...t, completed: !t.completed } : t
      )
    );
  }

  function deleteTodo(id) {
    setTodos((prev) => prev.filter((t) => t.id !== id));
  }

  return (
    <main className="container">
      <h1>TODO</h1>

      <div className="controls">
        <input
          aria-label="Нове завдання"
          placeholder="Введіть завдання..."
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <button onClick={addTodo}>Додати</button>
      </div>

      {error && (
        <p role="alert" className="error">{error}</p>
      )}

      <ul aria-label="Список завдань" className="list">
        {todos.map((t) => (
          <TodoItem
            key={t.id}
            todo={t}
            onToggle={() => toggleTodo(t.id)}
            onDelete={() => deleteTodo(t.id)}
          />
        ))}
      </ul>
    </main>
  );
}
