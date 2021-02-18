import jwt from 'jsonwebtoken'
import {promisify} from 'util' //utilizar o async await na função verify
import authConfig from '../../config/auth'

export default async (req,res, next) => {
  const authHeader = req.headers.authorization;
  if(!authHeader){
    return res.status(401).json({error: "Token não enviado"});
  }

  console.log(authHeader);

  //dividir o auth header a partir do espaço pois o token é composto por Beare + token
  const [bearer, token] = authHeader.split(' '); 

  try{ 

    const decodificar = await promisify(jwt.verify)(token, authConfig.secret);
    console.log(decodificar)
    req.userId = decodificar.id; //incluir o id do usuario dentro do head
     
    return next();
  }catch(err){
    return res.status(401).json({error: "Token Invalido!!"});
  }

  
}