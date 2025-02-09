import "./App.css";
import React, { useState, useEffect } from "react";
import Navbar from "./component/Navbar";
import Footer from "./component/Footer";

function App() {
    const [taskInput, setTaskInput] = useState("");
    const [tasks, setTasks] = useState(() => {
        // local Storage se tasks load karna (initial render pe) using ai
        const savedTasks = localStorage.getItem("tasks");
        return savedTasks ? JSON.parse(savedTasks) : [];
    });

    //  Jab bhi tasks change ho, local storage update karna
    useEffect(() => {
        localStorage.setItem("tasks", JSON.stringify(tasks));
    }, [tasks]);

    const handleChange = (e) => {
        setTaskInput(e.target.value);
    };

    const addTask = () => {
        if (taskInput.trim() !== "") {
            const task = {
                id: Date.now(),
                text: taskInput,
                completed: false,
            };
            setTasks((prevTasks) => [...prevTasks, task]); // ✅ Previous tasks preserve karna
            setTaskInput("");
        }
    };

    const deleteTask = (id) => {
        setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id));
    };

    const editTask = (id) => {
        const taskToEdit = tasks.find((task) => task.id === id);
        if (taskToEdit) {
            setTaskInput(taskToEdit.text);
            deleteTask(id);
        }
    };

    const toggleDone = (id) => {
        setTasks((prevTasks) =>
            prevTasks.map((task) =>
                task.id === id ? { ...task, completed: !task.completed } : task
            )
        );
    };

    return (
        <>
            <Navbar />
            <div className="app-container">
                {/* <h1>Todo App</h1> */}
                <div className="todo-container">
                    <input
                        type="text"
                        className="todo-input"
                        value={taskInput}
                        onChange={handleChange}
                        placeholder="Enter task here"
                    />
                    <button className="todo-btn" onClick={addTask}>
                        Add Task
                    </button>
                </div>
                <div className="todo-list-container">
                    <ul>
                        {tasks.map((task) => (
                            <li key={task.id}>
                                <span style={{ textDecoration: task.completed ? "line-through" : "none" }}>
                                    {task.text}
                                </span>
                                <span>
                                    <span className="todo-btn-li" onClick={() => toggleDone(task.id)}>
                                        {task.completed ? "↩️" : "✅"}
                                    </span>
                                    <span className="todo-btn-li" onClick={() => editTask(task.id)}>
                                        ✏️
                                    </span>
                                    <span className="todo-btn-li" onClick={() => deleteTask(task.id)}>
                                        ❌
                                    </span>
                                </span>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
            <Footer />
        </>
    );
}

export default App;
