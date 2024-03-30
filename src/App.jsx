import React, { useState, useEffect } from 'react';
import axios from 'axios';
import TaskList from './components/TaskList';
import TaskForm from './components/TaskForm';
import task from './assets/task.jpg';

const App = () => {
  const [tasks, setTasks] = useState([]);
  const [editingTask, setEditingTask] = useState(null);

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    const response = await axios.get('https://task-management-backend-jzuw.onrender.com/tasks');
    const sortedTasks = response.data.sort((a, b) => a.priority - b.priority);
    setTasks(sortedTasks);
  };

  const handleAddTask = async (taskData) => {
    await axios.post('https://task-management-backend-jzuw.onrender.com/tasks', taskData);
    fetchTasks();
  };

  const handleEditTask = async (taskData) => {
    await axios.put(`https://task-management-backend-jzuw.onrender.com/tasks/${taskData._id}`, taskData);
    fetchTasks();
    setEditingTask(null); // Exit edit mode
  };

  const handleDeleteTask = async (taskId) => {
    await axios.delete(`https://task-management-backend-jzuw.onrender.com/tasks/${taskId}`);
    fetchTasks();
  };

  const startEditing = (task) => {
    setEditingTask(task);
  };

  const cancelEditing = () => {
    setEditingTask(null);
  };

  return (

    <div className='flex flex-col items-center gap-5' >
      <h1 className='text-3xl text-blue-400'>Task Management App</h1>
      <TaskForm
        onSubmit={editingTask ? handleEditTask : handleAddTask}
        editingTask={editingTask}
        onCancel={cancelEditing}
      />
      <TaskList tasks={tasks} onDelete={handleDeleteTask} onEdit={startEditing} />
    </div>
   
  );
};

export default App;
