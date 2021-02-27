import { Router } from 'express'; // importr apenas o Routers do express
import multer from 'multer';

import UserController from './app/controllers/UserController'
import SessionController from './app/controllers/sessionControler'
import FileController from './app/controllers/fileControler'
import AgendamentoController from './app/controllers/AgendamentoController'
import PrestadorServicoController from './app/controllers/PrestadorServicoController'
import AuthMiddlware from './app/Middlewares/auth'
import multerConfig from './config/multer'

const routes = new Router();
const upload = multer(multerConfig);

routes.post('/user',  UserController.store);
routes.post('/sessions', SessionController.store)

routes.get('/', (req, res) => res.json({ mensagem: 'helo world' }));

routes.use(AuthMiddlware);
//todas as rotas após o middlwares só serão executadas se o ususario estiver logado
routes.put('/user', UserController.update) 

routes.post('/file',upload.single('file') , FileController.store)

routes.get('/prestadoservico', PrestadorServicoController.index)

routes.post('/agendamento', AgendamentoController.store)

export default routes;
