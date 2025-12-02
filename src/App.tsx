// App.tsx

import { useCallback, useEffect, useState } from "react";
import { Header } from "./components/header";
import { TaskList } from "./components/task-list";

const API_URL = "https://task-list-api-r9wz.onrender.com";

export type Task = {
  id: string;
  name: string;
  completed: boolean;
};

export function App() {
  const [tasks, setTasks] = useState<Task[]>([]);

  const fetchTasks = useCallback(async () => {
    const res = await fetch(`${API_URL}/tasks`);
    return res.json();
  }, []);

  const addTask = async (taskName: string) => {
    const taskPayload = {
      name: taskName,
    };

    const res = await fetch(`${API_URL}/tasks`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(taskPayload),
    });

    const newTask: Task = await res.json();
    setTasks([...tasks, newTask]);
  };

  const deleteTask = async (task: Task) => {
    await fetch(`${API_URL}/tasks/${task.id}`, {
      method: "DELETE",
    });

    fetchTasks().then((data) => setTasks(data));
  };

  const updateTaskComplete = async (task: Task) => {
    const action = task.completed ? "uncomplete" : "complete";

    await fetch(`${API_URL}/tasks/${task.id}/${action}`, {
      method: "PATCH",
    });

    fetchTasks().then((data) => setTasks(data));
  };

  useEffect(() => {
    fetchTasks().then((data) => setTasks(data));
  }, [fetchTasks]);

  return (
    <div className="bg-gray-100 h-screen">
      <Header addTask={addTask} />
      <TaskList
        tasks={tasks}
        deleteTask={deleteTask}
        updateTaskComplete={updateTaskComplete}
      />
    </div>
  );
}
