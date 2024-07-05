import React, { useState } from 'react';
import { Pie } from 'react-chartjs-2';
import 'chart.js/auto';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import './App.css';

const App = () => {
  const [tasks, setTasks] = useState([
    { id: 1, text: 'Learn HTML', done: false },
    { id: 2, text: 'Learn CSS', done: false },
    { id: 3, text: 'Learn JS', done: false },
    { id: 4, text: 'Learn React', done: false },
    { id: 5, text: 'Learn Express', done: false },
  ]);

  const [newTask, setNewTask] = useState('');

  const addTask = () => {
    if (newTask.trim()) {
      setTasks([...tasks, { id: Date.now(), text: newTask, done: false }]);
      setNewTask('');
    }
  };

  const toggleTaskDone = (id) => {
    setTasks(
      tasks.map(task => 
        task.id === id ? { ...task, done: !task.done } : task
      )
    );
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  const totalTasks = tasks.length;
  const completedTasks = tasks.filter(task => task.done).length;
  const pendingTasks = totalTasks - completedTasks;

  const data = {
    labels: ['Completed Tasks', 'Pending Tasks'],
    datasets: [
      {
        data: [completedTasks, pendingTasks],
        backgroundColor: ['#36A2EB', '#FF6384'],
        borderWidth: 1,
      },
    ],
  };

  const options = {
    plugins: {
      datalabels: {
        display: true,
        color: 'white',
        formatter: (value, context) => {
          const percentage = ((value / totalTasks) * 100).toFixed(2);
          return `${percentage}%`;
        },
      },
    },
    maintainAspectRatio: false,
  };

  return (
    <div className="container">
      <h1>Task List</h1>
      <h2>Summary</h2>
      <div className="summary">
        <div className="summary-box">Total tasks: {totalTasks}</div>
        <div className="summary-box">Pending tasks: {pendingTasks}</div>
        <div className="summary-box">Completed tasks: {completedTasks}</div>
      </div>
      <div className="chart-container">
        <Pie data={data} options={options} />
      </div>
      <h2>Tasks</h2>
      <div className="add-task">
        <input 
          type="text" 
          value={newTask} 
          onChange={(e) => setNewTask(e.target.value)} 
          placeholder="Add a new task" 
        />
        <button onClick={addTask}>Add Task</button>
      </div>
      <ul>
        {tasks.map(task => (
          <li key={task.id} className="task-item">
            <input 
              type="checkbox" 
              checked={task.done} 
              onChange={() => toggleTaskDone(task.id)}
            />
            <span 
              className={task.done ? 'task-done' : ''}
            >
              {task.text}
            </span>
            <button onClick={() => deleteTask(task.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;
