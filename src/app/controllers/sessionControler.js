import * as Yup from 'yup'
import User from '../models/User' 
import jwt from 'jsonwebtoken'

import authConfig from '../../config/auth' 

class SessionControler{
  async store(req, res){
    //validar os campos
    const esquema = Yup.object().shape({
      email: Yup.string().email().required(),
      password: Yup.string().required()
    })
    if(!(await esquema.isValid(req.body))){
      return res.status(400).json({mensagem: "Campos invalidos"})

    }
    
    const {email, password} = req.body
    const user = await User.findOne({ where: {email}});
    
    if(!user){
      return res.status(401).json({error : "Usuario não existe"});

    }
    
    if(!(await user.checkPassword(password))){
      return res.status(401).json({error : "Password errado"});

    }
    
    const {id, name} = user;

    return res.json({
      user: {
        id, 
        name, 
        email
      },
      token: jwt.sign({ id},  authConfig.secret, {
        expiresIn: authConfig.dataLimite // expirar em 7 dias
      }) // primeiro parametro payloud, segundo um texto unico, configurações do token 
    })

  }
}

export default new SessionControler ();