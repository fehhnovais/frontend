import type { MouseEvent } from "react";
import type { Task } from "../types";

type Props = {
  task: Task;
  onToggle: (id: number) => void;
  onDelete: (id: number) => void;
};

function TaskItem({ task, onToggle, onDelete }: Props) {
  const handleToggle = () => onToggle(task.id);

  const handleDelete = (event: MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    onDelete(task.id);
  };

  const itemClassName = task.isDone ? "task-item task-item--done" : "task-item";

  return (
    <li className={itemClassName} onClick={handleToggle}>
      <span className="task-item__status" aria-hidden="true">
        {task.isDone ? "\u2714" : "\u25CB"}
      </span>
      <span className="task-item__name">{task.name}</span>
      <button
        type="button"
        className="task-item__delete"
        onClick={handleDelete}
        aria-label={`Excluir ${task.name}`}
      >
        Excluir
      </button>
    </li>
  );
}

export default TaskItem;
