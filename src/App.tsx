// App.tsx

import { useEffect, useState } from "react";
import { Header } from "./components/header";
import { TaskList } from "./components/task-list";

// const API_URL = "https://task-list-api-r9wz.onrender.com";
const API_URL = "http://localhost:8000";

export type Task = {
  id: string;
  name: string;
  completed: boolean;
};

export function App() {
  const [tasks, setTasks] = useState<Task[]>([]);

  const fetchTasks = async () => {
    const res = await fetch(`${API_URL}/tasks`);
    return res.json();
  };

  const addTask = async (taskName: string) => {
    const newTask = {
      name: taskName,
    };

    await fetch(`${API_URL}/tasks`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newTask),
    });

    fetchTasks().then((data) => setTasks(data));
  };

  useEffect(() => {
    fetchTasks().then((data) => setTasks(data));
  }, []);

  return (
    <div className="bg-gray-100 h-screen">
      <Header addTask={addTask} />
      <TaskList tasks={tasks} />
    </div>
  );
}
