import { Link } from 'react-router-dom'

const TaskTable = ({ tasks, onDelete }) => {
  return (
    <table className="w-full mt-4 border">
      <thead className="bg-gray-100">
        <tr>
          <th className="border p-2">Title</th>
          <th className="border p-2">Description</th>
          <th className="border p-2">Actions</th>
        </tr>
      </thead>
      <tbody>
        {tasks.map((task, index) => (
          <tr key={index}>
            <td className="border p-2">{task.title}</td>
            <td className="border p-2">{task.description}</td>
            <td className="border p-2 space-x-2">
              <Link to={`/edit/${index}`} className="text-blue-500">Edit</Link>
              <button onClick={() => onDelete(index)} className="text-red-500">Delete</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}

export default TaskTable
