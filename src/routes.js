import { Router } from 'express'; // importr apenas o Routers do express


import UserController from './app/controllers/UserController'
import SessionController from './app/controllers/sessionControler'
import AuthMiddlware from './app/Middlewares/auth'

const routes = new Router();

routes.post('/user',  UserController.store);
routes.post('/sessions', SessionController.store)

routes.get('/', (req, res) => res.json({ mensagem: 'helo world' }));

routes.use(AuthMiddlware);
//todas as rotas após o middlwares só serão executadas se o ususario estiver logado
routes.put('/user', UserController.update) 

export default routes;
