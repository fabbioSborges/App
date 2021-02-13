import { Router } from 'express'; // importr apenas o Routers do express


import UserController from './app/controllers/UserController'

const routes = new Router();

routes.post('/user',  UserController.store);

routes.get('/', (req, res) => res.json({ mensagem: 'helo world' }));

export default routes;
