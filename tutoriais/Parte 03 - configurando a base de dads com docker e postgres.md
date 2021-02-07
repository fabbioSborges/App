# App

## Instalando o docker

1.  Instalar o Docker
    1.1. comando que retorna a versão do cker

    ```
      docker -v
    ```

    1.2. verificar os container em execução

    ```
      docker ps
    ```

    1.3. Acessar o portainer

    ```
      127.0.0.1:9000
    ```

### criando uma imagem postgree do docker

2. Imagem do banco de dados postgree
   https://hub.docker.com/_/postgres

   2.1. Comando para carregar a imagem

   ```
       $ docker run --name databaseAula -e POSTGRES_PASSWORD=123456 -p 5432:5432 -d postgres
   ```

   - run - comando para carregar
   - --name "database" - definir o nome da imagem
   - POSTGRES_PASSWORD="mysecretpassword" - definindo a senha
   - -p PORTAORIGEM_SO:PORTADESTINO_CONTAINER - redirecionamento de porta
   - -d - nome da imagem que será executada

   2.2. para iniciar um container use o comando

   ```
     docker start "nome do container ou ID"
     docker start databaseAula
   ```

   2.3. Para parar o container

   ```
     docker stop "nome do container ou ID"
     docker stop databaseAula
   ```

   2.4. Listar o container em execução

   ```
     docker ps
     docker ps
   ```

### acessando o postgres com o postbird

Interface gráfica para cessar o postgres

3. Download do postbird -[Postbird](https://www.electronjs.org/apps/postbird)

4. Iniciar o postbird com as configurações

- host: localhost
- Port: 5432
- Username: postgres
- senha: 123456

### Base de dados da aplicação

No postbird criar uma base de dados com o nome projetoDisciplina
