import React from 'react'

const TaskForm = ({ task, onChange, onSubmit }) => {
  return (
    <form onSubmit={onSubmit} className="space-y-3">
      <input
        className="border p-2 w-full"
        placeholder="Task Title"
        value={task.title}
        onChange={(e) => onChange("title", e.target.value)}
        required
      />
      <input
        className="border p-2 w-full"
        placeholder="Description"
        value={task.description}
        onChange={(e) => onChange("description", e.target.value)}
      />
      <button className="bg-blue-500 text-white px-4 py-2 rounded" type="submit">
        Save Task
      </button>
    </form>
  )
}

export default TaskForm
