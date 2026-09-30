import taskRender from "./taskRender";
import { tasksListApi } from "../api/tasksListApi";

export default async function tasksListRender(idUser: number, page = 1): Promise<void> {
  const container = document.querySelector("#tasks-container");

  if (!container) return;

  container.innerHTML = "";

  const ulElement = document.createElement("ul");
  ulElement.id = "tasks-list";
  ulElement.classList.add("list-group");

  container.append(ulElement);

  const listApi = await tasksListApi({ page });

  ulElement.innerHTML = "";

  if (listApi.data.length === 0) {
    const emptyElement = document.createElement("li");
    emptyElement.classList.add("list-group-item", "text-center", "text-muted");
    emptyElement.innerText = "Nenhuma tarefa encontrada. Crie uma nova!";
    ulElement.append(emptyElement);
    return;
  }

  listApi.data.forEach((task) => {
    const liElement = taskRender(task, idUser);
    ulElement.append(liElement);
  });

  const totalPages = Math.max(1, Math.ceil(listApi.total / listApi.limit));
  const paginationElement = document.createElement("div");
  paginationElement.classList.add("d-flex", "justify-content-between", "align-items-center", "mt-3");

  const prevButton = document.createElement("button");
  prevButton.type = "button";
  prevButton.classList.add("btn", "btn-sm", "btn-outline-secondary");
  prevButton.innerText = "Anterior";
  prevButton.disabled = listApi.page <= 1;
  prevButton.addEventListener("click", async () => {
    if (listApi.page > 1) {
      await tasksListRender(idUser, listApi.page - 1);
    }
  });

  const nextButton = document.createElement("button");
  nextButton.type = "button";
  nextButton.classList.add("btn", "btn-sm", "btn-outline-secondary");
  nextButton.innerText = "Próxima";
  nextButton.disabled = listApi.page >= totalPages;
  nextButton.addEventListener("click", async () => {
    if (listApi.page < totalPages) {
      await tasksListRender(idUser, listApi.page + 1);
    }
  });

  const pageIndicator = document.createElement("span");
  pageIndicator.classList.add("small", "text-muted");
  pageIndicator.innerText = `Página ${listApi.page} de ${totalPages}`;

  paginationElement.append(prevButton, pageIndicator, nextButton);
  container.append(paginationElement);
}
