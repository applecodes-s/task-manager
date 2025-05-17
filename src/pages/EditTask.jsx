import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getTasks, saveTasks } from '../data';

const EditTask = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [task, setTask] = useState(null);

  useEffect(() => {
    const tasks = getTasks();
    const taskToEdit = tasks.find(t => t.id === Number(id));
    if (taskToEdit) {
      setTask(taskToEdit);
    } else {
      alert('Task not found');
      navigate('/');
    }
  }, [id, navigate]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const tasks = getTasks().map(t =>
      t.id === Number(id) ? task : t
    );

    saveTasks(tasks);
    alert('Task updated!');
    navigate('/');
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTask(prev => ({ ...prev, [name]: value }));
  };

  return (
    task && (
      <div className="container mx-auto p-6 max-w-lg">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">Update Task Details</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <input
              type="text"
              name="title"
              value={task.title}
              onChange={handleChange}
              placeholder="Title"
              className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <textarea
              name="description"
              value={task.description}
              onChange={handleChange}
              placeholder="Description"
              className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-vertical"
              rows="4"
            />
          </div>
          <div>
            <input
              type="date"
              name="dueDate"
              value={task.dueDate}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <select
              name="status"
              value={task.status}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="Pending">Pending</option>
              <option value="Completed">Completed</option>
            </select>
          </div>
          <button
            type="submit"
            className=" bg-orange-500 text-white px-4 py-2 rounded-md hover:bg-orange-600 transition"
          >
            Update
          </button>
        </form>
      </div>
    )
  );
};

export default EditTask;