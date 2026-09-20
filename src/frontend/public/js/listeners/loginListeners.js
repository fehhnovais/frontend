import { loginApi } from "../api/loginApi.js";
import { setUserId } from "../utils/getUserIdFromAuth.js";

export default async function loginListeners() {
    const formElement = document.querySelector("#login-form");
    const messageElement = document.querySelector("#login-message");

    formElement.addEventListener("submit", async (event) => {
        event.preventDefault();

        const email = document.querySelector("#email-input").value;
        const password = document.querySelector("#password-input").value;

        try {
            messageElement.classList.add("d-none");

            const response = await loginApi(email, password);

            // Guarda o userId em memória (token vai no cookie HttpOnly)
            setUserId(response.userId);

            // Redireciona para tasks
            window.location.href = "/tasks.html";
        } catch (error) {
            messageElement.classList.remove("d-none");
            messageElement.innerText = error.response?.data?.error || "Erro ao fazer login";
        }
    });
}
