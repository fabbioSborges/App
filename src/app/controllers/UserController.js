
import User from '../models/User'

class userController{
  async store(req, res) {
    const userExists = await User.findOne({where: {email: req.body.email }})

    if(userExists){
      return res.status(400).json({mensagem: "Usuario já existe"})
    }

    const { id, name, email, prestador_servico } = await User.create(
      req.body
    );

    return res.json({ id, name, email, prestador_servico });
  }

}

export default new userController();