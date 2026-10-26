import { useState } from "react";
import type { ChangeEvent, FormEvent } from "react";

type Props = {
  onAdd: (name: string) => void;
};

function TaskForm({ onAdd }: Props) {
  const [name, setName] = useState<string>("");

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
  };

  const handleAdd = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const trimmed = name.trim();

    if (trimmed === "") {
      return;
    }

    onAdd(trimmed);
    setName("");
  };

  return (
    <form className="task-form" onSubmit={handleAdd}>
      <input
        type="text"
        className="task-form__input"
        placeholder="Digite o nome da task..."
        value={name}
        onChange={handleChange}
      />
      <button type="submit" className="task-form__button">
        Adicionar
      </button>
    </form>
  );
}

export default TaskForm;
