import React from 'react';

export default function TodoItem({ todo, onToggle, onDelete }) {
  return (
    <li className="item">
      <label className={todo.completed ? 'done' : ''}>
        <input
          type="checkbox"
          aria-label={`Позначити виконаним: ${todo.text}`}
          checked={todo.completed}
          onChange={onToggle}
        />
        <span>{todo.text}</span>
      </label>
      <button
        aria-label={`Видалити: ${todo.text}`}
        className="delete"
        onClick={onDelete}
      >
        ×
      </button>
    </li>
  );
}
