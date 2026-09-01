import listUserRender from "../render/listUserRender.js";

export default async function paginationClickHandler(event) {
    event.preventDefault();

    const button = event.currentTarget;
    const sectionListElement = document.querySelector("#list-container");
    const currentPage = parseInt(sectionListElement.dataset.currentPage || 1);

    let nextPage = currentPage;

    if (button.dataset.action === "prev") {
        nextPage = currentPage - 1;
    } else if (button.dataset.action === "next") {
        nextPage = currentPage + 1;
    }

    if (nextPage > 0) {
        await listUserRender(nextPage);
    }
}
