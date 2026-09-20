import tasksListRender from "../render/tasksListRender.js";
import { taskUpdateApi } from "../api/taskUpdateApi.js";

export default async function taskToggleHandler(event) {
    const liElement = event.target.closest("li");
    const idUser = liElement.userId;
    const taskId = liElement.taskId;
    const isDone = event.target.checked;

    try {
        await taskUpdateApi(idUser, taskId, { is_done: isDone });
        await tasksListRender(idUser);
    } catch (error) {
        event.target.checked = !isDone;
        alert("Erro ao atualizar tarefa. Tente novamente.");
        console.error(error);
    }
}
