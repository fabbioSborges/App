# App

## Git

GIT é um dos mais famosos sistemas de controle de versão de código aberto

Caracteristicas

- Sistema de controle de versão distribuído, o GIT segue uma abordagem peer to peer
- GIT permite aos desenvolvedores ter uma infinidade de ramos de código completamente independente. Criação, exclusão e fusão desses ramos é simples e não leva tempo
- GIT, todas as operações são atômicas.
- usa um modelo de dados que ajuda a garantir a integridade criptográfica de qualquer coisa presente dentro de um repositório.

  ### Instalação

      Acessar o site oficial [git](https://git-scm.com/downloads) e escolher o sistema operacional

  ### Comandos Básicos

  - git init: inicia o git
  - git clone "url": clona o repositorio da nuvem
  - git add <nome do arquivo> (Colocar '.' adiciona todos os arquivos)
  - git commit -m "descrição do commit"
  - git push: envia para repositorio git na nuvem as alterações

## Iniciando o Projeto

1. Criar a pasta onde o projeto será implementado. Nome da pasta APP
2. Terminal digitar yarn init -y para iniciar o projeto
3. Instalar o express
   yarn add express
4. Criar o arquivo .gitgnore
5. Criar a pasta SRC

   código da aplicação

   5.1 criar um arquivo app.js

   configurar o estrutura do servidor usando express

   ```javascript
   //CRIAR A ESTRUTURA DA APLICAÇÂO

   /*const express = require('express')
    const routes = require('./routes')*/

   import express from "express";
   import routes from "./routes";

   class App {
     constructor() {
       this.server = express(); // igual a variavel roras
       this.middlewares();
       this.routes();
     }
     middlewares() {
       //cadastrar todos os middlewares da aplicação
       this.server.use(express.json());
     }

     routes() {
       this.server.use(routes);
     }
   }

   //module.exports = new App().server; //exportar o server para outro arquivo;

   export default new App().server;
   ```

   5.2 criar um arquivo routes.js

   configurar informações do servidor

   ```javascript
   import { Router } from "express"; //importr apenas o Routers do express

   const routes = new Router();

   routes.get("/", (req, res) => {
     return res.json({ mensagem: "helo world" });
   });

   export default routes;
   ```

   5.3 criar um arquivo server.js

   arquivo com as rotas

   ```javascript
   //CRIAR O SERVIDOR

   import app from "./app";

   app.listen(3333);
   ```

6. Alterar o package.json inserindo o scrips para executar o nodemon

```javaScript
  "scripts": {
    "dev": "nodemon src/server.js"
  },
```

7. Criar uma pasta nodemon.json para configurar o nodemon para executar junto com o sucrase

```javascript
{
  "execMap": {
    "js":"sucrase-node"
  }
}
```
