import { Router } from 'express' //importr apenas o Routers do express

const routes = new Router();

routes.get('/', (req, res) => {
  return res.json({mensagem: "helo world"})
})

export default routes;