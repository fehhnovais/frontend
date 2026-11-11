import { useEffect, useRef, useState } from "react";
import type { ChangeEvent } from "react";
import clientApi from "../api/clientApi";
import { useAxios } from "../hooks/useAxios";
import type { PaginatedResponse, Task, User } from "../types";

type Props = {
  user: User;
};

const DEFAULT_TITLE = "Usuários e Tasks";

function UserTasks({ user }: Props) {
  const { data, error, isLoading, refetch } = useAxios<PaginatedResponse<Task>>(
    `/users/${user.id}/tasks?page=1&limit=20`
  );
  const [filter, setFilter] = useState<string>("");
  const [isSaving, setIsSaving] = useState<boolean>(false);
  const [saveError, setSaveError] = useState<string | null>(null);

  const filterInputRef = useRef<HTMLInputElement>(null);
  const responsesCountRef = useRef<number>(0);

  // Foco automático ao montar.
  useEffect(() => {
    filterInputRef.current?.focus();
  }, []);

  // Dado de bastidor: quantas respostas de tasks já chegaram (não renderiza).
  useEffect(() => {
    if (data === null) return;

    responsesCountRef.current += 1;
  }, [data]);

  // Sincroniza o título da aba e volta ao padrão na limpeza.
  const total = data?.total ?? null;

  useEffect(() => {
    document.title = total === null ? user.name : `${user.name} · ${total} tasks`;

    return () => {
      document.title = DEFAULT_TITLE;
    };
  }, [user.name, total]);

  const handleFilterChange = (event: ChangeEvent<HTMLInputElement>) => {
    setFilter(event.target.value);
  };

  const handleClear = () => {
    setFilter("");
    filterInputRef.current?.focus();
  };

  const handleShow = () => {
    console.log(`Respostas de tasks recebidas: ${responsesCountRef.current}`);
  };

  const handleToggle = async (task: Task) => {
    setIsSaving(true);
    setSaveError(null);

    try {
      await clientApi.put<Task>(`/users/${user.id}/tasks/${task.id}`, {
        is_done: !task.is_done,
      });
      refetch();
    } catch {
      setSaveError("Não foi possível salvar a task.");
    }

    setIsSaving(false);
  };

  const visibleTasks = (data?.data ?? []).filter((task) =>
    task.name.toLowerCase().includes(filter.trim().toLowerCase())
  );

  return (
    <section className="panel">
      <h2>Tasks de {user.name}</h2>

      <div className="filter">
        <input
          ref={filterInputRef}
          type="text"
          placeholder="Filtrar por nome..."
          value={filter}
          onChange={handleFilterChange}
        />
        <button type="button" onClick={handleClear}>
          Limpar
        </button>
        <button type="button" onClick={handleShow}>
          Mostrar
        </button>
      </div>

      {isLoading && <p>Carregando...</p>}

      {error !== null && (
        <div className="error">
          <p>{error}</p>
          <button type="button" onClick={refetch}>
            Tentar de novo
          </button>
        </div>
      )}

      {isSaving && <p>Salvando...</p>}
      {saveError !== null && <p className="error">{saveError}</p>}

      {data !== null && visibleTasks.length === 0 && <p>Nenhuma task</p>}

      {data !== null && (
        <ul className="list">
          {visibleTasks.map((task) => {
            const handleClick = () => void handleToggle(task);
            const className = task.is_done ? "item item--done" : "item";

            return (
              <li key={task.id}>
                <button type="button" className={className} onClick={handleClick}>
                  {task.is_done ? "✔ " : "○ "}
                  {task.name}
                </button>
              </li>
            );
          })}
        </ul>
      )}
    </section>
  );
}

export default UserTasks;
