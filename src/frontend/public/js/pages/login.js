import loginRender from "../render/loginRender.js";
import loginListeners from "../listeners/loginListeners.js";
import { checkAuthentication } from "../utils/checkAuthentication.js";
import { setUserId } from "../utils/getUserIdFromAuth.js";

window.addEventListener("DOMContentLoaded", async () => {
    try {
        // Valida se o usuário já está logado com token válido
        const auth = await checkAuthentication();

        if (auth.authenticated) {
            setUserId(auth.idUser);
            window.location.href = "/tasks.html";
            return;
        }

        // Se não tiver token válido, renderiza o login
        await loginRender();
        await loginListeners();
    } catch (error) {
        console.error("Falha ao carregar login:", error);
        // Mesmo com erro, renderiza o login
        await loginRender();
        await loginListeners();
    }
});
