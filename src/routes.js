import { Router } from 'express'; // importr apenas o Routers do express


import UserController from './app/controllers/UserController'
import SessionController from './app/controllers/sessionControler'

const routes = new Router();

routes.post('/user',  UserController.store);
routes.post('/sessions', SessionController.store)

routes.get('/', (req, res) => res.json({ mensagem: 'helo world' }));

export default routes;
