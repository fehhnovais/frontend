import { taskReassignApi } from "../api/taskReassignApi.js";
import tasksListRender from "../render/tasksListRender.js";

export default async function taskReassignHandler(event) {
    const selectElement = event.target;
    const newUserId = selectElement.value;

    if (!newUserId) return;

    const liElement = selectElement.closest("li");
    const taskId = liElement.taskId;
    const currentUserId = liElement.userId;

    try {
        await taskReassignApi(currentUserId, taskId, parseInt(newUserId));

        // Recarregar a lista após reatribuir
        await tasksListRender(currentUserId);

        // Mostrar mensagem de sucesso (opcional)
        alert("Tarefa reatribuída com sucesso!");
    } catch (error) {
        console.error("Erro ao reatribuir tarefa:", error);
        alert("Erro ao reatribuir tarefa. Tente novamente.");
    }
}
