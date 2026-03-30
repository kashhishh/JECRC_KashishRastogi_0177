import React, { useState } from 'react';
import './TodoApp.css';

function TodoApp() {
    const [task, setTask] = useState('');
    const [todos, setTodos] = useState([]);
    const [darkMode, setDarkMode] = useState(false);

    // Add Task
    const addTask = () => {
        if (task.trim() === '') return;

        const newTodo = {
            id: Date.now(),
            text: task,
            completed: false
        };

        setTodos([...todos, newTodo]);
        setTask('');
    };

    // Delete Task
    const deleteTask = (id) => {
        setTodos(todos.filter(todo => todo.id !== id));
    };

    // Toggle Complete
    const toggleComplete = (id) => {
        setTodos(
            todos.map(todo =>
                todo.id === id
                    ? { ...todo, completed: !todo.completed }
                    : todo
            )
        );
    };

    // Toggle Theme
    const toggleTheme = () => {
        setDarkMode(!darkMode);
    };

    return (
        <div className={darkMode ? 'dark' : ''}>
            <div className="container">

                {/* Toggle Button */}
                <button className="toggle-btn" onClick={toggleTheme}>
                    {darkMode ? '☀️ Light Mode' : '🌙 Dark Mode'}
                </button>

                <h1>✨ Todo App</h1>

                <input
                    type="text"
                    placeholder="Enter task..."
                    value={task}
                    onChange={(e) => setTask(e.target.value)}
                />

                <button onClick={addTask}>Add</button>

                <ul>
                    {todos.map(todo => (
                        <li key={todo.id}>
                            <span
                                onClick={() => toggleComplete(todo.id)}
                                className={`task-text ${todo.completed ? 'completed' : ''}`}
                            >
                                {todo.completed ? '☑' : '☐'} {todo.text}
                            </span>

                            <button
                                className="delete-btn"
                                onClick={() => deleteTask(todo.id)}
                            >
                                ❌
                            </button>
                        </li>
                    ))}
                </ul>

            </div>
        </div>
    );
}

export default TodoApp;