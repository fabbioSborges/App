
import User from '../models/User' 
import jwt from 'jsonwebtoken'

class SessionControler{
  async store(req, res){
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
      token: jwt.sign({ id},  'textounico', {
        expiresIn: '7d' // expirar em 7 dias
      }) // primeiro parametro payloud, segundo um texto unico, configurações do token 
    })

  }
}

export default new SessionControler ();