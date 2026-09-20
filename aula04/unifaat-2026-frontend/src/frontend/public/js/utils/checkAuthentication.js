import { validateTokenApi } from "../api/validateTokenApi.js";

export async function checkAuthentication() {
    try {
        // Valida o token (que está no cookie) fazendo uma chamada simples à API
        // A API retorna o user com o id
        const validation = await validateTokenApi();

        if (!validation.valid) {
            // Token inválido ou expirado
            return { authenticated: false };
        }

        return { authenticated: true, idUser: validation.data.id };
    } catch (error) {
        // Erro na validação
        console.error("Erro ao validar token:", error);
        return { authenticated: false };
    }
}

export function redirectToLogin() {
    window.location.href = "/login.html";
}
