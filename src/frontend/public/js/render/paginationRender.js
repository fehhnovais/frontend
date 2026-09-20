import listUserRender from "./listUserRender";

export default async function paginationRender(sectionListElement, listApi) {
    const currentPage = listApi.page;
    const limit = listApi.limit;
    const total = listApi.total;

    const pages = Math.ceil(total / limit);

    console.log({ currentPage, limit, total, pages });

    const paginationElement = document.createElement("div");
    paginationElement.classList.add("d-flex", "justify-content-center", "gap-2", "mt-3");

    for (let i = 0; i < pages; i++) {
        const pageNumber = i + 1;

        const pageButtonElement = document.createElement("button");
        pageButtonElement.classList.add("btn", "btn-sm");
        pageButtonElement.classList.add(pageNumber === currentPage ? "btn-primary" : "btn-outline-primary");
        pageButtonElement.innerText = pageNumber;
        pageButtonElement.pageNumber = pageNumber;

        pageButtonElement.addEventListener("click", async (event) => {
            event.preventDefault();
            const buttonElement = event.currentTarget;
            const pageNumber = buttonElement.pageNumber;
            await listUserRender(pageNumber);
        });

        paginationElement.append(pageButtonElement);
    }

    sectionListElement.append(paginationElement);
}