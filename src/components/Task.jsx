import React from 'react';

const Task = ({ task, onDelete, onEdit }) => {
  return (
    <tr>
      <td className="border border-gray-400 px-4 py-2">{task.title}</td>
      <td className="border border-gray-400 px-4 py-2">{task.description}</td>
      <td className="border border-gray-400 px-4 py-2">{task.priority}</td>
      <td className="border border-gray-400 px-4 py-2">{task.category}</td>
      <td className="border border-gray-400 px-4 py-2">
        <button onClick={() => onDelete(task._id)} className="text-white bg-red-600 px-2 py-1 rounded-lg">Delete</button>
        <button onClick={() => onEdit(task)} className='bg-green-500 px-2 py-1 rounded-lg text-white mx-5' >Edit</button>
      </td>
    </tr>
  );
};

export default Task;
