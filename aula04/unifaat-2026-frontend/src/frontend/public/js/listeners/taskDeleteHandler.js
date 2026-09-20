import tasksListRender from "../render/tasksListRender.js";
import { taskDeleteApi } from "../api/taskDeleteApi.js";

export default async function taskDeleteHandler(event) {
    const liElement = event.target.closest("li");
    const idUser = liElement.userId;
    const taskId = liElement.taskId;

    const shouldDelete = window.confirm("Deseja realmente excluir esta tarefa?");
    if (!shouldDelete) {
        return;
    }

    try {
        await taskDeleteApi(idUser, taskId);
        await tasksListRender(idUser);
        alert("Tarefa excluída com sucesso!");
    } catch (error) {
        alert("Erro ao excluir tarefa. Tente novamente.");
        console.error(error);
    }
}
