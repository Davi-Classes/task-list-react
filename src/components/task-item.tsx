// components/task-item.tsx
import type { Task } from "../App";
import { Button } from "./button";

type TaskItemProps = {
  task: Task;
  deleteTask: (task: Task) => Promise<void>;
  updateTaskComplete: (task: Task) => Promise<void>;
};

// Aqui nos estamos recebendo a tarefa como prop
// Nas classses, nós estamos mudando o estilo de acordo com o valor da propriedade "task.completed"
export const TaskItem = ({
  task,
  deleteTask,
  updateTaskComplete,
}: TaskItemProps) => (
  <li
    className={`${
      !task.completed ? "bg-white" : "bg-zinc-300"
    } text-xl shadow w-lg p-6 flex justify-between items-center rounded-xl`}
  >
    <div
      className={`${
        !task.completed ? "" : "line-through "
      }flex items-center gap-4`}
    >
      <input
        type="checkbox"
        className="w-4 h-4"
        checked={task.completed}
        onClick={() => updateTaskComplete(task)}
      />
      <p>{task.name}</p>
    </div>
    {/* Reutilizando o nosso componente de botão */}
    <Button
      onClick={() => deleteTask(task)}
      className="text-[16px] w-fit h-fit px-4 py-1 bg-red-500 hover:bg-red-400 rounded-xl"
    >
      Excluir
    </Button>
  </li>
);
