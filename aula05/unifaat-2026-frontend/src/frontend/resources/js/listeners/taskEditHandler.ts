import tasksListRender from "../render/tasksListRender";
import { taskUpdateApi } from "../api/taskUpdateApi";
import type { TaskListItemElement } from "../types/dom";

export default async function taskEditHandler(event: Event): Promise<void> {
  const triggerElement = event.currentTarget as HTMLElement | null;
  const liElement = (triggerElement ?? (event.target as HTMLElement | null)?.closest("li")) as TaskListItemElement | null;

  if (!liElement) return;

  const nameElement = liElement.querySelector<HTMLElement>(".task-name");
  if (!nameElement) return;

  const existingInput = liElement.querySelector<HTMLInputElement>(".task-edit-input");
  if (existingInput) {
    existingInput.focus();
    return;
  }

  const { userId: idUser, taskId } = liElement;
  const currentName = nameElement.textContent?.trim() ?? "";

  const inputElement = document.createElement("input");
  inputElement.type = "text";
  inputElement.value = currentName;
  inputElement.classList.add("form-control", "form-control-sm", "task-edit-input");
  inputElement.style.minWidth = "140px";

  const saveButton = document.createElement("button");
  saveButton.type = "button";
  saveButton.classList.add("btn", "btn-sm", "btn-success");
  saveButton.innerText = "Salvar";

  const cancelButton = document.createElement("button");
  cancelButton.type = "button";
  cancelButton.classList.add("btn", "btn-sm", "btn-outline-secondary");
  cancelButton.innerText = "Cancelar";

  const actionWrapper = document.createElement("div");
  actionWrapper.classList.add("d-flex", "align-items-center", "gap-2");
  actionWrapper.append(inputElement, saveButton, cancelButton);

  const previousParent = nameElement.parentElement;
  if (!previousParent) return;

  previousParent.replaceChild(actionWrapper, nameElement);
  inputElement.focus();
  inputElement.select();

  const saveTask = async (): Promise<void> => {
    const nextName = inputElement.value.trim();

    if (!nextName) {
      alert("O nome da tarefa não pode ficar vazio.");
      inputElement.focus();
      return;
    }

    try {
      await taskUpdateApi(taskId, { name: nextName });
      await tasksListRender(idUser);
    } catch (error) {
      alert("Erro ao editar tarefa");
      console.error(error);
    }
  };

  saveButton.addEventListener("click", () => {
    void saveTask();
  });

  cancelButton.addEventListener("click", async () => {
    await tasksListRender(idUser);
  });

  inputElement.addEventListener("keydown", (keyEvent: KeyboardEvent) => {
    if (keyEvent.key === "Enter") {
      void saveTask();
    }

    if (keyEvent.key === "Escape") {
      void tasksListRender(idUser);
    }
  });
}
