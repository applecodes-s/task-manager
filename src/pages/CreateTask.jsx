import React, { useState } from 'react';
import { getTasks, saveTasks } from '../data';
import { useNavigate } from 'react-router-dom';

const CreateTask = () => {
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [status, setStatus] = useState('Pending');

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!title || !description || !dueDate || !status) {
      alert('Please fill out all fields.');
      return;
    }

    const newTask = {
      id: Date.now(),
      title,
      description,
      dueDate,
      status,
    };

    const tasks = getTasks();
    tasks.push(newTask);
    saveTasks(tasks);

    alert('Task added successfully!');
    navigate('/');
  };

  const handleBack = (event) => {
    event.preventDefault();
    navigate('/');
  };

  return (
    <div className="container mx-auto p-6 max-w-lg">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Create New Task</h1>
      <button
        onClick={handleBack}
        className="bg-gray-400 text-white px-4 py-2 rounded-md hover:bg-gray-500 transition mb-4 cursor-pointer"
      >
        Back
      </button>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Title"
            className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Description"
            className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-vertical"
            rows="4"
          />
        </div>
        <div>
          <input
            type="date"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
            className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer"
          />
        </div>
        <div>
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer"
          >
            <option value="Pending">Pending</option>
            <option value="Completed">Completed</option>
          </select>
        </div>
        <button
          type="submit"
          className=" bg-orange-500 text-white px-4 py-2 rounded-md hover:bg-orange-600 transition cursor-pointer"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default CreateTask;