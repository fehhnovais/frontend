import type { PaginatedResponse, User } from "../types/api";

type OnChoose = (user: User) => void;

/**
 * Desenha a lista de resultados da busca dentro de #assign-search-results.
 * Mostra o total encontrado e, para cada usuário, nome, e-mail, cargo e
 * cidade/UF, com um botão "Escolher" que dispara onChoose(user).
 */
export default function userSearchResultsRender(
  result: PaginatedResponse<User>,
  onChoose: OnChoose
): void {
  const container = document.querySelector<HTMLDivElement>("#assign-search-results");

  if (!container) return;

  container.innerHTML = "";

  if (result.data.length === 0) {
    const emptyElement = document.createElement("p");
    emptyElement.classList.add("text-muted", "mb-0");
    emptyElement.innerText = "Nenhum usuário encontrado";
    container.append(emptyElement);
    return;
  }

  const totalElement = document.createElement("p");
  totalElement.classList.add("small", "text-muted", "mb-2");
  totalElement.innerText = `${result.total} usuário(s) encontrado(s)`;
  container.append(totalElement);

  const ulElement = document.createElement("ul");
  ulElement.classList.add("list-group");
  container.append(ulElement);

  result.data.forEach((user) => {
    const liElement = document.createElement("li");
    liElement.classList.add(
      "list-group-item",
      "d-flex",
      "justify-content-between",
      "align-items-center",
      "gap-3"
    );

    const infoElement = document.createElement("div");
    infoElement.classList.add("d-flex", "flex-column");

    const nameElement = document.createElement("span");
    nameElement.classList.add("fw-semibold");
    nameElement.innerText = user.name;
    infoElement.append(nameElement);

    const emailElement = document.createElement("span");
    emailElement.classList.add("small", "text-muted");
    emailElement.innerText = user.email;
    infoElement.append(emailElement);

    const jobAndPlace = buildJobAndPlaceText(user);

    if (jobAndPlace) {
      const detailElement = document.createElement("span");
      detailElement.classList.add("small", "text-muted");
      detailElement.innerText = jobAndPlace;
      infoElement.append(detailElement);
    }

    liElement.append(infoElement);

    const chooseButton = document.createElement("button");
    chooseButton.type = "button";
    chooseButton.classList.add("btn", "btn-sm", "btn-outline-primary");
    chooseButton.innerText = "Escolher";
    chooseButton.addEventListener("click", () => onChoose(user));
    liElement.append(chooseButton);

    ulElement.append(liElement);
  });
}

/** Monta "Cargo · Cidade/UF" usando só os campos que existirem. */
function buildJobAndPlaceText(user: User): string {
  const place = buildPlaceText(user);
  const parts = [user.job_title, place].filter((part): part is string => Boolean(part));

  return parts.join(" · ");
}

/** Monta "Cidade/UF", "Cidade" ou "UF" conforme o que existir. */
function buildPlaceText(user: User): string {
  if (user.city && user.state) return `${user.city}/${user.state}`;

  return user.city ?? user.state ?? "";
}
