import taskRender from "./taskRender.js";
import { tasksListApi } from "../api/tasksListApi.js";

export default async function tasksListRender(idUser, page = 1) {
    const container = document.querySelector("#tasks-container");

    container.innerHTML = "";

    const ulElement = document.createElement("ul");
    ulElement.id = "tasks-list";
    ulElement.classList.add("list-group");

    container.append(ulElement);

    const listApi = await tasksListApi(idUser, { page: page });

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
}
