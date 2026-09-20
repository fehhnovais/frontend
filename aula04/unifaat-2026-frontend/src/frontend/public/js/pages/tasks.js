import tasksListRender from "../render/tasksListRender.js";
import tasksListeners from "../listeners/tasksListeners.js";
import { checkAuthentication, redirectToLogin } from "../utils/checkAuthentication.js";
import { setUserId, getUserId, clearUserId } from "../utils/getUserIdFromAuth.js";

window.addEventListener("DOMContentLoaded", async () => {
    try {
        // Valida o token antes de renderizar
        const auth = await checkAuthentication();

        if (!auth.authenticated) {
            clearUserId();
            redirectToLogin();
            return;
        }

        const { idUser } = auth;
        setUserId(idUser);

        await tasksListRender(idUser);
        await tasksListeners(idUser);
    } catch (error) {
        console.error("Falha ao carregar tarefas:", error);
        clearUserId();
        redirectToLogin();
    }
});
