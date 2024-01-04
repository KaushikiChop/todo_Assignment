import React, { useState, useEffect, useRef, useCallback, useContext } from 'react';
import uuid from 'react-uuid';

// Create a ThemeContext for managing the theme
const ThemeContext = React.createContext();

// Define light and dark themes
const lightTheme = {
  background: '#fff',
  color: '#333',
};
const darkTheme = {
  background: '#333',
  color: '#fff',
};

const TodoItem = ({ todo, onToggle, onRemove }) => {
  return (
    <div style={{ marginBottom: '10px', display: 'flex', alignItems: 'center' }}>
      <span
        style={{
          textDecoration: todo.completed ? 'line-through' : 'none',
          cursor: 'pointer',
          flex: 1,
        }}
        onClick={() => onToggle(todo.id)}
      >
        {todo.text}
      </span>
      <button style={{ marginLeft: '5px' }} onClick={() => onRemove(todo.id)}>
        Remove
      </button>
    </div>
  );
};

const TodoList = ({ todos, onToggle, onRemove }) => {
  return (
    <div>
      {todos.map((todo) => (
        <TodoItem key={todo.id} todo={todo} onToggle={onToggle} onRemove={onRemove} />
      ))}
    </div>
  );
};

const TodoApp = () => {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState('');
  const [theme, setTheme] = useState('light');
  const inputRef = useRef();

  // Load todos from local storage on mount
  useEffect(() => {
    const storedTodos = JSON.parse(localStorage.getItem('todos')) || [];
    setTodos(storedTodos);
  }, []);

  // Save todos to local storage whenever the todos state changes
  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  // Set focus on the input field when the component mounts
  useEffect(() => {
    inputRef.current.focus();
  }, []);

  // Toggle the completion status of a todo
  const toggleTodo = useCallback((id) => {
    setTodos((prevTodos) =>
      prevTodos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  }, []);

  // Remove a todo from the list
  const removeTodo = useCallback((id) => {
    setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id));
  }, []);

  // Toggle between light and dark themes
  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'));
  };

  return (
    <ThemeContext.Provider value={theme === 'light' ? lightTheme : darkTheme}>
      <div
        style={{
          background: theme === 'light' ? lightTheme.background : darkTheme.background,
          color: theme === 'light' ? lightTheme.color : darkTheme.color,
          padding: '20px',
          borderRadius: '8px',
        }}
      >
        <h1>TODO App</h1>
        <label>
          New Todo:
          <input
            type="text"
            value={newTodo}
            onChange={(e) => setNewTodo(e.target.value)}
            ref={inputRef}
          />
        </label>
        <button
          onClick={() => {
            if (newTodo.trim() !== '') {
              setTodos((prevTodos) => [
                ...prevTodos,
                { id: uuid(), text: newTodo, completed: false },
              ]);
              setNewTodo('');
            }
          }}
        >
          Add Todo
        </button>
        <TodoList todos={todos} onToggle={toggleTodo} onRemove={removeTodo} />
        <button onClick={toggleTheme}>
          Switch to {theme === 'light' ? 'Dark' : 'Light'} Theme
        </button>
      </div>
    </ThemeContext.Provider>
  );
};

export default TodoApp;
