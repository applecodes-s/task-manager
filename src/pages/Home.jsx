import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getTasks, saveTasks } from '../data';

const Home = () => {
  const [tasks, setTasks] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterDate, setFilterDate] = useState('');
  const [filterStatus, setFilterStatus] = useState('');
  const [currentPage, setCurrentPage] = useState(1);

  const tasksPerPage = 5;
  const navigate = useNavigate();

  useEffect(() => {
    const storedTasks = getTasks();
    const tasksWithStatus = storedTasks.map(task => ({
      ...task,
      status: task.status || 'Pending',
    }));
    setTasks(tasksWithStatus);
  }, []);

  const handleAddTask = () => {
    navigate('/CreateTask');
  };

  const handleEdit = (id) => {
    navigate(`/edit/${id}`);
  };

  const handleDelete = (id) => {
    const updatedTasks = tasks.filter(task => task.id !== id);
    setTasks(updatedTasks);
    saveTasks(updatedTasks);
  };

  const filteredTasks = tasks.filter(task => {
    const matchesSearch =
      task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      task.description.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesDate = filterDate ? task.dueDate === filterDate : true;
    const matchesStatus = filterStatus ? task.status === filterStatus : true;

    return matchesSearch && matchesDate && matchesStatus;
  });

  const indexOfLastTask = currentPage * tasksPerPage;
  const indexOfFirstTask = indexOfLastTask - tasksPerPage;
  const currentTasks = filteredTasks.slice(indexOfFirstTask, indexOfLastTask);
  const totalPages = Math.ceil(filteredTasks.length / tasksPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="container mx-auto p-6 max-w-4xl">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Manage Your Tasks Effortlessly</h1>
      <button
        onClick={handleAddTask}
        className="bg-orange-500 text-white px-4 py-2 rounded-md hover:bg-orange-600 transition mb-6 cursor-pointer"
      >
        Add Task
      </button>

      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <input
          type="text"
          placeholder="Search by title or description"
          value={searchTerm}
          onChange={(e) => { setSearchTerm(e.target.value); setCurrentPage(1); }}
          className="border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 flex-1"
        />
        <input
          type="date"
          value={filterDate}
          onChange={(e) => { setFilterDate(e.target.value); setCurrentPage(1); }}
          className="border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer"
        />
        <select
          value={filterStatus}
          onChange={(e) => { setFilterStatus(e.target.value); setCurrentPage(1); }}
          className="border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer"
        >
          <option value="">All Status</option>
          <option value="Pending">Pending</option>
          <option value="Completed">Completed</option>
        </select>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full border-collapse bg-white shadow-md rounded-lg">
          <thead>
            <tr className="bg-orange-100 border-b border-gray-800'">
              <th className="border-r border-gray-400 px-4 py-2 text-left">Title</th>
              <th className="border-r border-gray-400 px-4 py-2 text-left">Description</th>
              <th className="border-r border-gray-400 px-4 py-2 text-left">Due Date</th>
              <th className="border-r border-gray-400 px-4 py-2 text-left">Status</th>
              <th className="border-r border-gray-400 px-4 py-2 text-left">Edit</th>
              <th className="border-r border-gray-400 px-4 py-2 text-left">Delete</th>
            </tr>
          </thead>
          <tbody>
            {currentTasks.length === 0 ? (
              <tr>
                <td colSpan="6" className="text-center py-4 text-gray-500">
                  No tasks found
                </td>
              </tr>
            ) : (
              currentTasks.map(task => (
                <tr key={task.id} className="hover:bg-gray-50">
                  <td className="border border-gray-200 px-4 py-2">{task.title}</td>
                  <td className="border border-gray-200 px-4 py-2">{task.description}</td>
                  <td className="border border-gray-200 px-4 py-2">{task.dueDate}</td>
                  <td className="border border-gray-200 px-4 py-2">
                    <span className={`px-4 py-2 rounded-full text-sm ${
                      task.status === 'Completed' ? 'bg-green-200 text-green-800' : 'bg-yellow-200 text-yellow-600'
                    }`}>
                      {task.status || 'Pending'}
                    </span>
                  </td>
                  <td className="border border-gray-200 px-4 py-2">
                    <button
                      onClick={() => handleEdit(task.id)}
                      className="bg-orange-600 text-white px-3 py-1 rounded-md hover:bg-orange-500 transition cursor-pointer"
                    >
                      Edit
                    </button>
                  </td>
                  <td className="border border-gray-200 px-4 py-2">
                    <button
                      onClick={() => handleDelete(task.id)}
                      className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-700 transition cursor-pointer"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {totalPages > 1 && (
        <div className="flex justify-center gap-2 mt-6">
          {Array.from({ length: totalPages }, (_, index) => (
            <button
              key={index + 1}
              onClick={() => paginate(index + 1)}
              className={` cursor-pointer px-4 py-2 rounded-md transition ${
                currentPage === index + 1
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
              }`}
            >
              {index + 1}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default Home;