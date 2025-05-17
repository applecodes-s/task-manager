Task Manager App is a lightweight React application designed to help users organize and track their daily tasks efficiently. It allows users to create, edit, and update task details including title, description, due date, and status (Pending or Completed). Tasks are stored in the browser’s localStorage, providing persistent data without requiring a backend server.

Technical Details:

Frontend: Built using React with functional components and hooks (useState, useEffect) for state management and side effects.

Routing: React Router handles navigation between pages such as Home, Create Task, and Edit Task.

Styling: Tailwind CSS provides utility-first, responsive design and quick UI styling.

Build Tool: Vite is used for fast development and production builds.

Data Storage: Tasks are saved and retrieved from localStorage using simple helper functions (getTasks, saveTasks).

Deployment: Easily deployable on platforms like Vercel or Netlify due to static build output.

This app demonstrates core React concepts and modern frontend development practices, making it a great starter project for learning React, client-side routing, and state persistence.
