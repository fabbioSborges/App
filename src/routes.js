import { Router } from 'express'; // importr apenas o Routers do express

import User from './app/models/User'

const routes = new Router();

routes.get('/user', async(req, res) => {
  const user = await User.create({
    name: 'Fabbio Anderson',
    email: "fabio@uespi.br",
    password_hash: '123456'
  })
  res.json(user)
})

routes.get('/', (req, res) => res.json({ mensagem: 'helo world' }));

export default routes;
