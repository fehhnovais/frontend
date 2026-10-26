CONTEXTO
Na tela de tarefas, permitir criar uma tarefa e atribuí-la a outro usuário. O usuário de destino é encontrado pela API de busca (POST /users/search: Elasticsearch → ids → WHERE IN no Postgres), por qualquer campo: nome, e-mail, cargo, cidade, UF ou bio. Tudo acontece num modal: digitar o nome da tarefa, buscar a pessoa, escolher um dos resultados e confirmar.
O backend já está pronto (busca e POST /users/{idUser}/tasks). O trabalho é todo no frontend, em TypeScript.
Repositório base: https://github.com/luan-tavares/unifaat-2026-frontend

ANTES DE COMEÇAR
docker compose up -d --build
docker compose run --rm nodecommand-container migrate
docker compose run --rm nodecommand-container seed
O seed cria 40 usuários com perfil (senha: senha123) e já popula o Elasticsearch. Swagger com exemplos da busca: http://localhost:8080/docs

O QUE FAZER
1. Botão e modal (src/resources/tasks.html): botão "Nova tarefa para outro usuário" com data-bs-toggle="modal" data-bs-target="#assign-task-modal". No modal: nome da tarefa (#assign-task-name), select do campo de busca (#assign-search-field), texto da busca (#assign-search-value) e botão Buscar, resultados (#assign-search-results), usuário escolhido (#assign-selected-user), botões Cancelar (data-bs-dismiss="modal") e Criar tarefa (#assign-task-submit). O HTML do modal fica no tasks.html: o TypeScript só cuida da interação.
2. Tipos e API: em js/types/api.ts, o tipo UserSearchFilters (name, email, job_title, bio, city, state, is_active). Em js/api/userSearchApi.ts: userSearchApi(filters, page, limit): Promise<PaginatedResponse<User>>, fazendo clientApi.post("/users/search", { filters, page, limit }).
3. Buscar no modal: campo + texto viram o filtro (ex.: cidade + "curitiba" vira { city: "curitiba" }). Chame userSearchApi(filters, 1, 10) e liste nome, e-mail, cargo e cidade/UF, com um botão "Escolher" em cada um. Mostre o total encontrado e mensagens para nenhum resultado, texto vazio e erro da API.
4. Escolher e criar: mostre "Atribuir para: Nome (e-mail)". "Criar tarefa" só funciona com o nome preenchido e um usuário escolhido. Use taskCreateApi(usuario.id, { name }), que já existe (POST /users/{idUser}/tasks). Sucesso: feche o modal, limpe os campos e mostre uma mensagem; se o escolhido for você mesmo, recarregue a lista (tasksListRender). Erro: mensagem no modal, sem fechar.
5. Organização: js/api/userSearchApi.ts, js/render/userSearchResultsRender.ts, js/listeners/assignTaskModalListeners.ts, registrando os listeners em js/pages/tasks.ts.

COMO TESTAR
Entre com alice.souza@example.com / senha123, abra o modal e busque cidade "curitiba" (4 usuários). Teste também cargo "devops", UF "PE" e bio "elastic". Crie uma tarefa para alguém, entre com esse usuário (senha123) e confira a tarefa na lista dele. Sem nome ou sem usuário escolhido, não pode criar.

REGRAS
- O usuário de destino tem que ser encontrado pela POST /users/search (não vale listar todos com GET /users)
- Tipar tudo, sem any solto (reaproveite User, Task e PaginatedResponse<T>)
- Seguir o padrão do projeto (js/api, js/listeners, js/render, js/pages)
- Sem else (early return, continue ou valor padrão antes do if)
- Tratar erros com mensagem ao usuário
- Não alterar o backend, não quebrar login, lista, criar, concluir e excluir tarefas, e não usar frameworks além de Bootstrap e Axios
