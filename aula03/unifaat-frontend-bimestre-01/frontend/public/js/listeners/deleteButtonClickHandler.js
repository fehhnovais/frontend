import { userDeleteApi } from "../api/userDeleteApi.js";
import listUserRender from "../render/listUserRender.js";

export default async function deleteButtonClickHandler(event) {
    event.preventDefault();

    const liElement = event.currentTarget.closest("li");

    const id = liElement.userId;

    await userDeleteApi(id);

    // Obter a página atual do data-attribute
    const sectionListElement = document.querySelector("#list-container");
    const currentPage = parseInt(sectionListElement.dataset.currentPage || 1);

    // Recarregar a lista mantendo a página
    await listUserRender(currentPage);
}