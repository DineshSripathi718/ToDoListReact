import React, { useEffect, useState } from 'react'

import './toDoList.css';

function ToDoList() {

    const [tasks, setTasks] = useState([]);

    const [task, setTask] = useState("");

    const [hasLoaded, setHasLoded] = useState(false);

    useEffect(
        () => {
            const existedTask = JSON.parse(localStorage.getItem('tasks')) || [];
            setTasks(existedTask);
            setHasLoded(true);
        }, []
    );

    useEffect(
        () => {
            if(hasLoaded){
                localStorage.setItem("tasks", JSON.stringify(tasks));
            }
        },[tasks]
    );
    const handleTask = (event) =>{
        setTask(event.target.value);
    }

    const addTask = () => {
        const currentTask = task;
        if(currentTask.trim() != ""){
            let updatedTasks = [...tasks];
            updatedTasks.push(currentTask);
            setTasks(updatedTasks);
            setTask("");
        }
    }

    const moveTaskUp = (index) => {
        if(index > 0){
            let updatedTasks = [...tasks];
            let temp = updatedTasks[index];
            updatedTasks[index] = updatedTasks[index - 1];
            updatedTasks[index - 1] = temp;
            setTasks(updatedTasks);
        }
    }

    const moveTaskDown = (index) => {
        if(index < tasks.length - 1){
            let updatedTasks = [...tasks];
            let temp = updatedTasks[index];
            updatedTasks[index] = updatedTasks[index + 1];
            updatedTasks[index + 1] = temp;
            setTasks(updatedTasks);
        }
    }

    const deleteTask = (index) => {
        let oldTasks = [...tasks];
        const updatedTasks = oldTasks.filter((oldValue, oldIndex) => oldIndex != index);
        setTasks(updatedTasks);
    }

  return (
    <div className='toDoContainer'>
        <h1 className='title'>To Do List</h1>
        <div className="container">
            <input type="text" placeholder='Enter your task' name="task" id="task" value={task} onChange={handleTask} />
            <button className='addButton' onClick={addTask}>add task</button>
        </div>
        <table className="taskList">
            <tr className="taskTitle">
                <th>Tasks</th>
                <th>Action Buttons</th>
                <th>Delete</th>
            </tr>
            {(tasks.length > 0) ? tasks.map( (task, index) => {
                return <tr key={index}>
                    <td className='taskName'>{task}</td>
                    <td>
                        <button className='upButton' onClick={() => {
                            moveTaskUp(index)
                        }}>up</button>
                        <button className='downButton' onClick={() => {
                            moveTaskDown(index)
                        }}>down</button>
                    </td>
                    <td>
                        <button className='deleteButton' onClick={() => {
                            deleteTask(index)
                        }}>Delete</button>
                    </td>
                </tr>
            }) : <tr className='displayError'>
                    <td colSpan={3}>No tasks to display</td>
                </tr>} 
        </table>
    </div>
  )
}

export default ToDoList