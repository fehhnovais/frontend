import type { Task } from "../types/api";
import type { TaskListItemElement } from "../types/dom";
import taskToggleHandler from "../listeners/taskToggleHandler";
import taskDeleteHandler from "../listeners/taskDeleteHandler";
import taskEditHandler from "../listeners/taskEditHandler";

export default function taskRender(task: Task, idUser: number): TaskListItemElement {
  const liElement = document.createElement("li") as TaskListItemElement;
  liElement.classList.add("list-group-item", "d-flex", "justify-content-between", "align-items-center", "gap-3");
  liElement.taskId = task.id;
  liElement.userId = idUser;

  const checkboxElement = document.createElement("input");
  checkboxElement.type = "checkbox";
  checkboxElement.classList.add("form-check-input");
  checkboxElement.checked = task.is_done;
  checkboxElement.addEventListener("change", taskToggleHandler);
  liElement.append(checkboxElement);

  const nameElement = document.createElement("span");
  nameElement.innerText = task.name;
  nameElement.classList.add("flex-grow-1", "task-name", "ms-2");
  nameElement.addEventListener("dblclick", taskEditHandler);

  if (task.is_done) {
    nameElement.classList.add("text-decoration-line-through", "text-muted");
  }

  liElement.append(nameElement);

  const actionsContainer = document.createElement("div");
  actionsContainer.classList.add("d-flex", "align-items-center", "gap-2");

  const buttonEditElement = document.createElement("button");
  buttonEditElement.type = "button";
  buttonEditElement.classList.add("btn", "btn-sm", "btn-outline-primary");
  buttonEditElement.innerText = "Editar";
  buttonEditElement.addEventListener("click", taskEditHandler);
  actionsContainer.append(buttonEditElement);

  const buttonDeleteElement = document.createElement("button");
  buttonDeleteElement.type = "button";
  buttonDeleteElement.classList.add("btn", "btn-danger", "btn-sm");
  buttonDeleteElement.innerText = "Excluir";
  buttonDeleteElement.addEventListener("click", taskDeleteHandler);
  actionsContainer.append(buttonDeleteElement);

  liElement.append(actionsContainer);

  return liElement;
}
