import { userUpdateApi } from "../api/userUpdateApi.js";
import listUserRender from "../render/listUserRender.js";

export default async function editButtonClickHandler(event) {
    event.preventDefault();

    const liElement = event.currentTarget.parentElement;
    const id = liElement.userId;

    const infoElement = liElement.querySelector(".d-flex.flex-column");
    const nameSpan = infoElement.querySelector("span");
    const emailSmall = infoElement.querySelector("small");

    const currentName = nameSpan.innerText;
    const currentEmail = emailSmall.innerText;

    // Converter para inputs
    const nameInput = document.createElement("input");
    nameInput.type = "text";
    nameInput.className = "form-control form-control-sm mb-2";
    nameInput.value = currentName;

    const emailInput = document.createElement("input");
    emailInput.type = "email";
    emailInput.className = "form-control form-control-sm mb-2";
    emailInput.value = currentEmail;

    // Limpar conteúdo e adicionar inputs
    infoElement.innerHTML = "";
    infoElement.append(nameInput, emailInput);

    // Modificar botão de editar para salvar
    const editButton = liElement.querySelector(".btn-warning");
    editButton.innerText = "Salvar";
    editButton.classList.remove("btn-warning");
    editButton.classList.add("btn-success");

    // Remover listeners antigos e adicionar novo
    const newEditButton = editButton.cloneNode(true);
    editButton.replaceWith(newEditButton);

    newEditButton.addEventListener("click", async (saveEvent) => {
        saveEvent.preventDefault();

        const newName = nameInput.value.trim();
        const newEmail = emailInput.value.trim();

        // Validar campos vazios
        if (!newName || !newEmail) {
            alert("Nome e email não podem ser vazios");
            return;
        }

        try {
            await userUpdateApi(id, { name: newName, email: newEmail });

            // Obter a página atual do data-attribute
            const sectionListElement = document.querySelector("#list-container");
            const currentPage = parseInt(sectionListElement.dataset.currentPage || 1);

            // Recarregar a lista mantendo a página
            await listUserRender(currentPage);
        } catch (error) {
            console.error("Erro ao atualizar usuário:", error);
            alert("Erro ao atualizar usuário");
        }
    });
}
