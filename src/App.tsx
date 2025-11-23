// App.tsx

import { useState } from "react";
import { Header } from "./components/header";
import { TaskList } from "./components/task-list";

export type Task = {
  id: string;
  name: string;
  completed: boolean;
};

export function App() {
  const [tasks, setTasks] = useState<Task[]>([]);

  const addTask = (taskName: string) => {
    const newTask = {
      id: crypto.randomUUID(),
      name: taskName,
      completed: false
    }

    setTasks([newTask, ...tasks])
  }

  return (
    <div className="bg-gray-100 h-screen">
      <Header addTask={addTask} />
      <TaskList tasks={tasks} />
    </div>
  );
}
