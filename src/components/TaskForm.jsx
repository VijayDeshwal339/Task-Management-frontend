import React, { useState, useEffect } from 'react';

const TaskForm = ({ onSubmit, editingTask, onCancel }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [priority, setPriority] = useState(0);
  const [category, setCategory] = useState('');

  useEffect(() => {
    if (editingTask) {
      setTitle(editingTask.title);
      setDescription(editingTask.description);
      setPriority(editingTask.priority);
      setCategory(editingTask.category);
    }
  }, [editingTask]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ _id: editingTask ? editingTask._id : null, title, description, priority, category });
    setTitle('');
    setDescription('');
    setPriority(0);
    setCategory('');
  };

  return (
    <div className='flex flex-col items-center gap-5'>
      <h2 className='text-lg uppercase'>{editingTask ? 'Edit Task' : 'Add Task'}</h2>
      <form onSubmit={handleSubmit} className='flex flex-col gap-2'>
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={e => setTitle(e.target.value)}
        />
        <textarea
          placeholder="Description"
          value={description}
          onChange={e => setDescription(e.target.value)}
        />
        <input
          type="number"
          placeholder="Priority"
          value={priority}
          onChange={e => setPriority(e.target.value)}
        />
        <input
          type="text"
          placeholder="Category"
          value={category}
          onChange={e => setCategory(e.target.value)}
        />
        <div className="flex gap-2">
          <button type="submit" className='text-white bg-blue-600 px-2 py-1 rounded-lg'>
            {editingTask ? 'Update Task' : 'Add Task'}
          </button>
          {editingTask && (
            <button type="button" onClick={onCancel} className='text-white bg-gray-400 px-2 py-1 rounded-lg'>
              Cancel
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default TaskForm;
