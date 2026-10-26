CONTEXTO
Criar um app React (Vite + TypeScript) com um to-do de tasks, usando apenas o que vimos na aula: componentes, parâmetros (props), callbacks e estado (useState). Tudo local, sem API.
A entrega segue o fluxo Git do curso: Pull Request do seu fork para o main do professor.
Repositório do professor: https://github.com/luan-tavares/unifaat-2026-frontend

O QUE NÃO PODE USAR
- useEffect
- useRef
- bibliotecas de estado, de formulário ou de UI além do que o Vite gera
(Referências e efeitos ficam para a próxima aula.)

O QUE O APP PRECISA FAZER (Task: id, name, isDone)
1. Adicionar uma task digitando o nome num campo (campo controlado) e clicando em "Adicionar". Nome vazio não adiciona.
2. Marcar/desmarcar a task como feita ao clicar nela.
3. Excluir uma task.
4. Filtrar a lista por Todas / Pendentes / Feitas, com o filtro como estado de tipo união: type Filter = "all" | "pending" | "done".
5. Mostrar o contador "N pendente(s)", calculado a partir da lista (valor derivado, sem outro estado).
6. Mostrar "Nenhuma task" quando a lista (filtrada) estiver vazia.

REGRAS DE CÓDIGO
- Componentes separados, no mínimo: TaskForm, TaskList e TaskItem (o App é o dono do estado e passa dados por props e funções por callback)
- Tipar tudo em TypeScript (strict), sem any; type Props em cada componente; generics explícitos quando o valor inicial não basta: useState<Task[]>([])
- Arquivos de componente em .tsx
- Só const: nunca let em componente
- Estado booleano com prefixo is: const [isDone, setIsDone] = ...
- Imutabilidade: nunca alterar array ou objeto do estado no lugar (use [...lista, nova], map e filter)
- Quando o novo estado depende do anterior, use a forma de função: setTasks(current => ...)
- Evento de clique explícito: função nomeada ligada no JSX: onClick={handleAdd}
- Sem else / else if
- key estável nas listas (o id, nunca o índice)

COMO ENTREGAR
A branch TEM QUE SE CHAMAR RA-tf-08 (seu RA, -tf-, e o número do TF com 2 dígitos). Exemplo: 1234567-tf-08. SEM ISSO, O TF VALE ZERO.
1. Fork do repositório do professor e clone do SEU fork.
2. git switch main
   git pull --ff-only upstream main
   git switch -c 1234567-tf-08
3. Na raiz do repositório, crie um diretório com EXATAMENTE o mesmo nome da branch, com o app React (pasta app/) e o arquivo tf.md dentro:
   1234567-tf-08/tf.md
   1234567-tf-08/app/   (npm create vite@latest app -- --template react-ts)
4. O tf.md deve ter nome, RA e GitHub (link por extenso):
   Nome: Maria da Silva
   RA: 1234567
   GitHub: https://github.com/maria-silva
5. git add -A
   git commit -m "TF-08"
   git push -u origin 1234567-tf-08
6. Abra o Pull Request da sua branch para o main do professor:
   https://github.com/luan-tavares/unifaat-2026-frontend/compare/main...SEU-USUARIO:1234567-tf-08?expand=1
   Título do PR: TF-08 · RA · Nome (ex.: TF-08 · 1234567 · Maria da Silva)
   Descrição do PR: o conteúdo do seu tf.md
O PR nunca será mergeado: o professor o fecha depois de corrigir.

ANTES DE ENTREGAR, CONFIRA
- A branch no GitHub se chama RA-tf-08 (com o SEU RA)
- Existe o diretório com o mesmo nome da branch, com tf.md (Nome, RA e GitHub) e a pasta app/
- cd app && npm install && npm run dev abre o to-do funcionando
- npx tsc --noEmit (dentro de app/) sem erro
- Nenhum useEffect nem useRef no código