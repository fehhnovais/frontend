import taskToggleHandler from "../listeners/taskToggleHandler.js";
import taskDeleteHandler from "../listeners/taskDeleteHandler.js";

export default function taskRender(task, idUser) {
    const liElement = document.createElement("li");
    liElement.classList.add("list-group-item", "d-flex", "align-items-center", "gap-2");
    liElement.taskId = task.id;
    liElement.userId = idUser;

    const checkboxElement = document.createElement("input");
    checkboxElement.type = "checkbox";
    checkboxElement.classList.add("form-check-input");
    checkboxElement.checked = Boolean(task.is_done);
    checkboxElement.addEventListener("change", taskToggleHandler);
    liElement.append(checkboxElement);

    const nameElement = document.createElement("span");
    nameElement.innerText = task.name;
    nameElement.classList.add("flex-grow-1");

    if (task.is_done) {
        nameElement.classList.add("text-decoration-line-through", "text-muted");
    }

    liElement.append(nameElement);

    const buttonDeleteElement = document.createElement("button");
    buttonDeleteElement.type = "button";
    buttonDeleteElement.classList.add("btn", "btn-danger", "btn-sm");
    buttonDeleteElement.innerText = "Excluir";
    buttonDeleteElement.addEventListener("click", taskDeleteHandler);
    liElement.append(buttonDeleteElement);

    return liElement;
}
