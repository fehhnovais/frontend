import userRender from "./userRender.js";
import { userListApi } from "../api/userListApi.js";
import paginationClickHandler from "../listeners/paginationClickHandler.js";

export default async function listUserRender(page = 1) {

    const sectionListElement = document.querySelector("#list-container");

    // Armazenar a página atual no data-attribute
    sectionListElement.dataset.currentPage = page;

    sectionListElement.innerHTML = "";

    const ulElement = document.createElement("ul");
    ulElement.classList.add("list-group");

    sectionListElement.append(ulElement);

    const { data: users, page: currentPage, limit, total, next } = await userListApi({ page });

    ulElement.innerHTML = "";

    users.forEach((user) => {
        const liElement = userRender(user);

        ulElement.append(liElement);
    });

    // Criar container de paginação
    const paginationContainer = document.createElement("div");
    paginationContainer.classList.add("d-flex", "justify-content-between", "align-items-center", "mt-3");

    // Botão Anterior
    const prevButton = document.createElement("button");
    prevButton.className = "btn btn-outline-primary";
    prevButton.innerText = "← Anterior";
    prevButton.dataset.action = "prev";
    prevButton.disabled = currentPage === 1;
    prevButton.addEventListener("click", paginationClickHandler);

    // Informação da página
    const pageInfo = document.createElement("span");
    pageInfo.className = "text-muted";
    pageInfo.innerText = `Página ${currentPage} de ${Math.ceil(total / limit)}`;

    // Botão Próxima
    const nextButton = document.createElement("button");
    nextButton.className = "btn btn-outline-primary";
    nextButton.innerText = "Próxima →";
    nextButton.dataset.action = "next";
    nextButton.disabled = !next;
    nextButton.addEventListener("click", paginationClickHandler);

    paginationContainer.append(prevButton, pageInfo, nextButton);
    sectionListElement.append(paginationContainer);

}
