import React, { useState } from 'react';
import "./ToDoList.css";

const ToDoList = () => {

    const [tasks, setTasks] = useState([]);
    const [newTask, setNewTask] = useState("");

    function handleInputChange(event) {
        setNewTask(event.target.value);
    }

    function addTask() {
        if (newTask.trim() !== "") {
            setTasks(t => [...t, newTask]);
            setNewTask("");
        }
    }

    function deleteTask(index) {
        const updatedTasks = tasks.filter((_, i) => i !== index);
        setTasks(updatedTasks);
    }

    function moveTaskup(index) {
        if (index > 0) {
            const updatedTasks = [...tasks];
            [updatedTasks[index], updatedTasks[index - 1]] = 
                [updatedTasks[index - 1], updatedTasks[index]];
            setTasks(updatedTasks);
        }
    }

    function moveTaskdown(index) {
        if (index < tasks.length - 1) {
            const updatedTasks = [...tasks];
            [updatedTasks[index], updatedTasks[index + 1]] = 
                [updatedTasks[index + 1], updatedTasks[index]];
            setTasks(updatedTasks);
        }
    }

    return (
        <div className="to-do-list">
            <h1>To-Do List</h1>
            <div>
                <input
                    type="text"
                    placeholder='Enter a task...'
                    value={newTask}
                    onChange={handleInputChange}
                />
                <button
                    className='add-button'
                    onClick={addTask}>
                    Add
                </button>
                <div>
                    <ol>
                        {tasks.map((task, index) =>
                            <li className='list' key={index}>
                                <span className='text'>{task}</span>
                                <button
                                    className='delete-button'
                                    onClick={() => deleteTask(index)}>Delete</button>
                                <button
                                    className='move-button'
                                    onClick={() => moveTaskup(index)}>▲</button>
                                <button
                                    className='move-button'
                                    onClick={() => moveTaskdown(index)}>▼</button>
                            </li>
                        )}
                    </ol>
                </div>
            </div>
        </div>
    );
};

export default ToDoList;
