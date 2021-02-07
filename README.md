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
  - git commit "descrição do commit"
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

   5.2 criar um arquivo server.js

   configurar informações do servidor

   5.3 criar um arquivo routes.js

   arquivo com as rotas

6. Configurando app.js

```javascript
//CRIAR A ESTRUTURA DA APLICAÇÂO

const express = require("express");
const routes = require("./routes");

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

module.exports = new App().server; //exportar o server para outro arquivo;
```
