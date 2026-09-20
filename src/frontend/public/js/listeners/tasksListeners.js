import tasksListRender from "../render/tasksListRender.js";
import { clearUserId } from "../utils/getUserIdFromAuth.js";

export default async function tasksListeners(idUser) {
    const addTaskBtn = document.querySelector("#add-task-btn");
    const logoutBtn = document.querySelector("#logout-btn");

    addTaskBtn.addEventListener("click", async () => {
        const taskInput = document.querySelector("#task-input");
        const taskName = taskInput.value.trim();

        if (!taskName) {
            alert("Digite uma tarefa!");
            return;
        }

        try {
            const { taskCreateApi } = await import("../api/taskCreateApi.js");
            await taskCreateApi(idUser, { name: taskName });
            taskInput.value = "";
            await tasksListRender(idUser);
        } catch (error) {
            alert("Erro ao criar tarefa");
            console.error(error);
        }
    });

    logoutBtn.addEventListener("click", () => {
        clearUserId();
        // O cookie é deletado automaticamente na próxima validação
        window.location.href = "/login.html";
    });
}
