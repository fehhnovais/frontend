# Unifaat :: Frontend :: Aula 02 - CSS, Seletores e JS Reativo

---

## 1. Instalação e Execução <a name="instalacao-e-execucao"></a>

### Siga os passos abaixo para rodar o projeto via Docker:

1. Clonar o repositório:

   ```sh
   git clone https://github.com/luan-tavares/unifaat-frontend-bimestre-01
   ```

2. Entrar na pasta do projeto:

   ```sh
   cd unifaat-frontend-bimestre-01
   ```

3. Criar o arquivo `.env` na raiz do projeto copiando o `.env.example`:


   ```sh
   cp .env.example .env
   ```

4. Subir a aplicação com Docker Compose:


   ```sh
   docker compose up --build
   ```


---

## 2. 📁 Estrutura de Diretórios (raiz) <a name="estrutura-de-diretorios-raiz"></a>

| Caminho / Pasta      | Descrição                                                                 |
|----------------------|---------------------------------------------------------------------------|
| `docker/`            | Dockerfiles específicos para cada serviço da aplicação.                   |
| `public/`            | Arquivos públicos (como `index.html`) servidos diretamente por HTTP.     |
| `.env`               | Variáveis de ambiente sensíveis carregadas em tempo de execução.          |
| `.env.example`       | Template de `.env` para novos devs copiarem e configurarem.               |
| `.gitignore`         | Lista de arquivos e pastas que o Git deve ignorar.                        |
| `docker-compose.yml` | Orquestração dos containers do projeto.                                   |
| `readme.md`          | Documentação principal do projeto (este arquivo).                         |

---

## 3. 🐳 Containers e Imagens Docker <a name="containers-e-imagens-docker"></a>

### 🗄️ Containers de Infraestrutura

| Container         | Imagem Base         | Função                                           | Porta Interna |
|-------------------|---------------------|--------------------------------------------------|---------------|
| `nginx-container` | `nginx:1.25-alpine` | Servir arquivos estáticos HTTP (reverse proxy).  | 80            |

### 💾 Volumes Persistentes

| Volume        | Utilizado por     | Finalidade                 |
|---------------|-------------------|----------------------------|
| `./public:/var/www` | `nginx_01` | Disponibilizar os arquivos estáticos da pasta `public/` dentro do container. |

### 🌐 Redes

Todos os containers estão conectados à rede Docker personalizada:

```text
app_network
```

### 🌍 Portas Expostas Externamente

| Serviço | Porta Interna | Porta Externa | Acesso Externo        |
|---------|---------------|---------------|-----------------------|
| NGINX   | 80            | **8080**      | http://localhost:8080 |
