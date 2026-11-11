import { useState } from "react";
import { useAxios } from "../hooks/useAxios";
import type { PaginatedResponse, User } from "../types";

type Props = {
  selectedId: number | null;
  onChoose: (user: User) => void;
};

function UserList({ selectedId, onChoose }: Props) {
  const [page, setPage] = useState<number>(1);
  const { data, error, isLoading, refetch } = useAxios<PaginatedResponse<User>>(
    `/users?page=${page}&limit=5`
  );

  const handlePrevious = () => setPage((current) => current - 1);
  const handleNext = () => setPage((current) => current + 1);

  return (
    <section className="panel">
      <h2>Usuários</h2>

      {isLoading && <p>Carregando...</p>}

      {error !== null && (
        <div className="error">
          <p>{error}</p>
          <button type="button" onClick={refetch}>
            Tentar de novo
          </button>
        </div>
      )}

      {data !== null && (
        <ul className="list">
          {data.data.map((user) => {
            const handleChoose = () => onChoose(user);
            const className = user.id === selectedId ? "item item--active" : "item";

            return (
              <li key={user.id}>
                <button type="button" className={className} onClick={handleChoose}>
                  <strong>{user.name}</strong>
                  <span>{user.email}</span>
                  <span>{user.job_title ?? "Sem cargo"}</span>
                </button>
              </li>
            );
          })}
        </ul>
      )}

      <div className="pager">
        <button type="button" onClick={handlePrevious} disabled={page <= 1}>
          Anterior
        </button>
        <span>Página {page}</span>
        <button type="button" onClick={handleNext} disabled={data === null || data.next === null}>
          Próxima
        </button>
      </div>
    </section>
  );
}

export default UserList;
