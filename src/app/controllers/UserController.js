
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

  async update(req,res){
    const {email, passwordAntigo } = req.body;
    const user = await User.findByPk(req.userId) //buscar o usuario no banco de dados pelo id

    //verificar se ele quer alterar o email, comparar com o email atual
    if(email != user.email){
      const existeUsuarioEmail = await User.findOne({where: {email}});
      if(existeUsuarioEmail){//usuario já existe
        return res.status(400).json({error: "Email já cadastrado"});
      }
    }

    //verificar se a senha antiga é a senha cadastrada no banco
    //só vai realizar a verificação se ele informou a senha antiga
    console.log(passwordAntigo)
    if(!passwordAntigo){
      return res.status(400).json({error: 'Senha antiga não informada'});
    }

    if(!(await user.checkPassword(passwordAntigo))){
      return res.status(400).json({error: 'Senha antiga diferente da senha cadastrada'});
    } 

    const { id, name, prestador_servico } = await user.update(req.body);

    return res.json({ id, name, email, prestador_servico });
  }

}

export default new userController();