import type { User, UserSearchFilters } from "../types/api";
import { userSearchApi } from "../api/userSearchApi";
import { taskCreateApi } from "../api/taskCreateApi";
import userSearchResultsRender from "../render/userSearchResultsRender";
import tasksListRender from "../render/tasksListRender";

// Campos de busca aceitos pelo select do modal.
type SearchField = "name" | "email" | "job_title" | "city" | "state" | "bio";

const SEARCH_FIELDS: readonly SearchField[] = [
  "name",
  "email",
  "job_title",
  "city",
  "state",
  "bio",
];

/**
 * Liga toda a interação do modal "Nova tarefa para outro usuário":
 * busca (POST /users/search), escolha do usuário e criação da tarefa
 * (POST /users/{idUser}/tasks). O HTML do modal vive no tasks.html.
 */
export default function assignTaskModalListeners(idUser: number): void {
  const modal = document.querySelector<HTMLDivElement>("#assign-task-modal");
  const searchButton = document.querySelector<HTMLButtonElement>("#assign-search-btn");
  const searchValueInput = document.querySelector<HTMLInputElement>("#assign-search-value");
  const submitButton = document.querySelector<HTMLButtonElement>("#assign-task-submit");

  if (!modal || !searchButton || !searchValueInput || !submitButton) return;

  // Estado local do modal: quem foi escolhido na busca.
  const state: { selectedUser: User | null } = { selectedUser: null };

  const runSearch = () => void handleSearch(state);
  const runSubmit = () => void handleSubmit(idUser, state);

  searchButton.addEventListener("click", runSearch);

  searchValueInput.addEventListener("keydown", (event) => {
    if (event.key !== "Enter") return;
    event.preventDefault();
    runSearch();
  });

  submitButton.addEventListener("click", runSubmit);

  // Limpa tudo sempre que o modal é fechado para não vazar estado.
  modal.addEventListener("hidden.bs.modal", () => resetModal(state));
}

/** Lê o campo escolhido e o texto, monta o filtro e chama a busca. */
async function handleSearch(state: { selectedUser: User | null }): Promise<void> {
  const fieldSelect = document.querySelector<HTMLSelectElement>("#assign-search-field");
  const valueInput = document.querySelector<HTMLInputElement>("#assign-search-value");
  const value = valueInput?.value.trim() ?? "";
  const field = normalizeField(fieldSelect?.value);

  if (!value) {
    renderFeedback("Digite um texto para buscar", "warning");
    return;
  }

  renderFeedback("Buscando...", "info");

  try {
    const filters: UserSearchFilters = { [field]: value };
    const result = await userSearchApi(filters, 1, 10);
    clearFeedback();
    userSearchResultsRender(result, (user) => chooseUser(user, state));
  } catch (error) {
    console.error(error);
    renderFeedback("Erro ao buscar usuários. Tente novamente.", "danger");
  }
}

/** Guarda o usuário escolhido e mostra o resumo em #assign-selected-user. */
function chooseUser(user: User, state: { selectedUser: User | null }): void {
  state.selectedUser = user;

  const selectedElement = document.querySelector<HTMLDivElement>("#assign-selected-user");

  if (!selectedElement) return;

  selectedElement.innerHTML = "";
  selectedElement.classList.add("alert", "alert-success", "mb-0");
  selectedElement.innerText = `Atribuir para: ${user.name} (${user.email})`;
}

/** Cria a tarefa para o usuário escolhido, validando nome e seleção. */
async function handleSubmit(
  idUser: number,
  state: { selectedUser: User | null }
): Promise<void> {
  const nameInput = document.querySelector<HTMLInputElement>("#assign-task-name");
  const taskName = nameInput?.value.trim() ?? "";
  const target = state.selectedUser;

  if (!taskName) {
    renderFeedback("Digite o nome da tarefa", "warning");
    return;
  }

  if (!target) {
    renderFeedback("Escolha um usuário para atribuir a tarefa", "warning");
    return;
  }

  renderFeedback("Criando tarefa...", "info");

  try {
    await taskCreateApi(target.id, { name: taskName });
    closeModal();

    if (target.id === idUser) {
      await tasksListRender(idUser);
    }

    showPageMessage(`Tarefa criada para ${target.name}`);
  } catch (error) {
    console.error(error);
    renderFeedback("Erro ao criar a tarefa. Tente novamente.", "danger");
  }
}

/** Garante que o valor do select é um campo de busca conhecido. */
function normalizeField(value: string | undefined): SearchField {
  const found = SEARCH_FIELDS.find((field) => field === value);

  return found ?? "name";
}

/** Mostra uma mensagem dentro do modal (#assign-task-feedback). */
function renderFeedback(message: string, variant: "info" | "warning" | "danger"): void {
  const feedback = document.querySelector<HTMLDivElement>("#assign-task-feedback");

  if (!feedback) return;

  feedback.className = `alert alert-${variant} mb-0`;
  feedback.innerText = message;
  feedback.classList.remove("d-none");
}

function clearFeedback(): void {
  const feedback = document.querySelector<HTMLDivElement>("#assign-task-feedback");

  if (!feedback) return;

  feedback.innerText = "";
  feedback.classList.add("d-none");
}

/** Fecha o modal usando o botão de dismiss do Bootstrap (via código). */
function closeModal(): void {
  const dismissButton = document.querySelector<HTMLButtonElement>(
    "#assign-task-modal [data-bs-dismiss='modal']"
  );

  dismissButton?.click();
}

/** Limpa campos, resultados, seleção e estado ao fechar o modal. */
function resetModal(state: { selectedUser: User | null }): void {
  state.selectedUser = null;

  const nameInput = document.querySelector<HTMLInputElement>("#assign-task-name");
  const valueInput = document.querySelector<HTMLInputElement>("#assign-search-value");
  const results = document.querySelector<HTMLDivElement>("#assign-search-results");
  const selected = document.querySelector<HTMLDivElement>("#assign-selected-user");

  if (nameInput) nameInput.value = "";
  if (valueInput) valueInput.value = "";
  if (results) results.innerHTML = "";

  if (selected) {
    selected.innerHTML = "";
    selected.className = "";
  }

  clearFeedback();
}

/** Mensagem de sucesso fora do modal, no topo da página de tarefas. */
function showPageMessage(message: string): void {
  const main = document.querySelector("main");

  if (!main) return;

  const existing = document.querySelector("#assign-task-page-message");
  existing?.remove();

  const alertElement = document.createElement("div");
  alertElement.id = "assign-task-page-message";
  alertElement.classList.add("alert", "alert-success", "w-100");
  alertElement.setAttribute("role", "alert");
  alertElement.innerText = message;

  main.prepend(alertElement);
}
