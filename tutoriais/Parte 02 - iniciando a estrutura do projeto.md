# App

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

8. Criar a pasta config dentro do src
   Configurações da aplicação
   - conexão com a base de dados
   - outros serviços
9. Criar a pasta database database dentro de src e dentro de database criar a pasta migrations

10. Criar a pasta app

11. Dentro da pasta app criar a pasta controllers

12. Dentro da pasta app criar a pasta models
