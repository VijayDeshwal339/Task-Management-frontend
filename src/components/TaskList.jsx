import React, { useState, useEffect } from 'react';
import Task from './Task';
import './TaskList.css';

const TaskList = ({ tasks, onDelete, onEdit }) => {
  const [filterCategory, setFilterCategory] = useState('');
  const [sortDirection, setSortDirection] = useState('asc'); // 'asc' or 'desc'
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const uniqueCategories = Array.from(new Set(tasks.map(task => task.category)));
    setCategories(uniqueCategories);
  }, [tasks]);

  const handleFilterChange = (e) => {
    setFilterCategory(e.target.value);
  };

  const handleSort = () => {
    const newDirection = sortDirection === 'asc' ? 'desc' : 'asc';
    setSortDirection(newDirection);
  };

  const filteredTasks = tasks.filter(task => {
    if (filterCategory === '') return true; 
    return task.category === filterCategory;
  });

  const sortedTasks = filteredTasks.sort((a, b) => {
    if (sortDirection === 'asc') {
      return a.priority - b.priority;
    } else {
      return b.priority - a.priority;
    }
  });

  return (
    <div className='flex flex-col items-center'>
      <h2 className='text-xl italic'>Tasks</h2>
      <div className='flex justify-between items-center mb-3'>
        <div>
          <label htmlFor='filterCategory'>Filter by Category:</label>
          <select id='filterCategory' value={filterCategory} onChange={handleFilterChange}>
            <option value=''>All</option>
            {categories.map(category => (
              <option key={category} value={category}>{category}</option>
            ))}
          </select>
        </div>
        <div>
          <button onClick={handleSort}>
            {sortDirection === 'asc' ? 'Sort Asc' : 'Sort Desc'}
          </button>
        </div>
      </div>
      <div className='table-responsive'>
        <table className='table-auto border-collapse border border-gray-400'>
          <thead>
            <tr className='bg-gray-200'>
              <th className='border border-gray-400 px-4 py-2'>Title</th>
              <th className='border border-gray-400 px-4 py-2'>Description</th>
              <th className='border border-gray-400 px-4 py-2'>Priority</th>
              <th className='border border-gray-400 px-4 py-2'>Category</th>
              <th className='border border-gray-400 px-4 py-2'>Actions</th>
            </tr>
          </thead>
          <tbody>
            {sortedTasks.map(task => (
              <Task key={task._id} task={task} onDelete={onDelete} onEdit={onEdit} />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TaskList;

