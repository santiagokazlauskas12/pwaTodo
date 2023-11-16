import React, { useState, useEffect } from 'react';

const TodoList = () => {
  const initialTasks = JSON.parse(localStorage.getItem('tasks')) || [];
  const [tasks, setTasks] = useState(initialTasks);
  const [newTask, setNewTask] = useState('');
  const [selectedTaskIndex, setSelectedTaskIndex] = useState(null);

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  const addTask = () => {
    if (newTask.trim() !== '') {
      setTasks([...tasks, newTask]);
      setNewTask('');
    }
  };

  const removeTask = () => {
    if (selectedTaskIndex !== null) {
      const updatedTasks = tasks.filter((_, index) => index !== selectedTaskIndex);
      setTasks(updatedTasks);
      setSelectedTaskIndex(null);
    }
  };

  return (
    <div>
      <h2>ToDo List</h2>
      <ul>
        {tasks.map((task, index) => (
          <li key={index}>
            {task}{' '}
            <button onClick={() => setSelectedTaskIndex(index)}>Select</button>
          </li>
        ))}
      </ul>
      <div>
        <input
          type="text"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
        />
        <button onClick={addTask}>Add Task</button>
      </div>
      {selectedTaskIndex !== null && (
        <div>
          <button onClick={removeTask}>Remove Selected Task</button>
        </div>
      )}
    </div>
  );
};

export default TodoList;

