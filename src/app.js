// CRIAR A ESTRUTURA DA APLICAÇÂO

/* const express = require('express')
const routes = require('./routes') */

import express from 'express';
import path from 'path'
import routes from './routes';

import './database'

class App {
  constructor() {
    this.server = express(); // igual a variavel roras
    this.middlewares();
    this.routes();
  }

  middlewares() {
    // cadastrar todos os middlewares da aplicação
    this.server.use(express.json());
    this.server.use('/files', express.static(path.resolve(__dirname, '..', 'tmp', 'uploads')))
  }

  routes() {
    this.server.use(routes);
  }
}

// module.exports = new App().server; //exportar o server para outro arquivo;

export default new App().server;
