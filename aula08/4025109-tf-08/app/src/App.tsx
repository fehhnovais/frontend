import { useState } from "react";
import type { Filter, Task } from "./types";
import TaskForm from "./components/TaskForm";
import TaskFilter from "./components/TaskFilter";
import TaskList from "./components/TaskList";
import "./App.css";

function App() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [filter, setFilter] = useState<Filter>("all");

  const handleAdd = (name: string) => {
    setTasks((current) => {
      const nextId = current.reduce((max, task) => Math.max(max, task.id), 0) + 1;
      const newTask: Task = { id: nextId, name, isDone: false };

      return [...current, newTask];
    });
  };

  const handleToggle = (id: number) => {
    setTasks((current) =>
      current.map((task) =>
        task.id === id ? { ...task, isDone: !task.isDone } : task
      )
    );
  };

  const handleDelete = (id: number) => {
    setTasks((current) => current.filter((task) => task.id !== id));
  };

  const handleFilterChange = (nextFilter: Filter) => {
    setFilter(nextFilter);
  };

  const visibleTasks = tasks.filter((task) => {
    if (filter === "pending") {
      return !task.isDone;
    }

    if (filter === "done") {
      return task.isDone;
    }

    return true;
  });

  const pendingCount = tasks.filter((task) => !task.isDone).length;

  return (
    <main className="app">
      <h1 className="app__title">To-do</h1>

      <TaskForm onAdd={handleAdd} />

      <TaskFilter filter={filter} onChange={handleFilterChange} />

      <p className="app__counter">{pendingCount} pendente(s)</p>

      <TaskList
        tasks={visibleTasks}
        onToggle={handleToggle}
        onDelete={handleDelete}
      />
    </main>
  );
}

export default App;
