export default function editNameList(liElement) {

    liElement.addEventListener("click", (event) => {
        event.preventDefault();

        if (event.target !== event.currentTarget) {
            return;
        }

        const currentName = liElement.firstChild.textContent;
        const buttonDeleteElement = liElement.querySelector("button");
        const inputElement = document.createElement("input");
        const buttonEditElement = document.createElement("button");

        inputElement.setAttribute("type", "text");
        inputElement.setAttribute("value", currentName);
        inputElement.classList.add("form-control");

        buttonEditElement.setAttribute("type", "button");
        buttonEditElement.classList.add("btn", "btn-primary", "btn-sm");
        buttonEditElement.innerText = "Alterar";

        const confirmEdit = (confirmEvent) => {
            confirmEvent.preventDefault();

            const newName = inputElement.value.trim();

            if (newName === "") {
                return;
            }

            inputElement.remove();
            buttonEditElement.remove();
            buttonDeleteElement.remove();
            liElement.append(document.createTextNode(newName));
            liElement.append(buttonDeleteElement);
        };

        buttonEditElement.addEventListener("click", confirmEdit);
        inputElement.addEventListener("keypress", (keypressEvent) => {
            if (keypressEvent.key === "Enter") {
                confirmEdit(keypressEvent);
            }
        });

        liElement.firstChild.remove();
        buttonDeleteElement.remove();
        liElement.append(inputElement);
        liElement.append(buttonEditElement);
        inputElement.focus();
    });

}