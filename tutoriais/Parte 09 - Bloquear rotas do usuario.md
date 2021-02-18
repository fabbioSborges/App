# Bloquear Rotas de usuarios não cadastrados

1. Criar uma rota update para atualizar usuarios no userController
   Rota só faz sentindos para usuarios logados

2. PAsta Middlewares dentro da pasta app

3. Criar o arquivo auth.js dentro da pasta de Middlewares

   - Middlerware de autenticação para verificar se o usuario está logado
   - Analisa o token da aplicação enviado pelo front end dentro do head do pacote http

```javascript
import jwt from "jsonwebtoken";
import { promisify } from "util"; //utilizar o async await na função verify
import authConfig from "../../config/auth";

export default async (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return res.status(401).json({ error: "Token não enviado" });
  }

  console.log(authHeader);

  //dividir o auth header a partir do espaço pois o token é composto por Beare + token
  const [bearer, token] = authHeader.spplit(" ");

  try {
    const decodificar = await promisify(jwt.verify)(token, authConfig.secret);
    console.log(decodificar);
    req.userId = decodificar.id; //incluir o id do usuario dentro do head

    return next();
  } catch (err) {
    return res.status(401).json({ error: "Token Invalido!!" });
  }
};
```

4. Criar o metodo update no contreoler de usuario

```javascript
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

```

5. No arquivo de routes.js chamar o middleware de autenticação e a rota de atualização com método put

   ```javascript
       import AuthMiddlware from './app/Middlewares/auth'
       ...

       routes.use(AuthMiddlware);
       //todas as rotas após o middlwares só serão executadas se o ususario estiver logado
       routes.put('/user', UserController.update)

   ```

6. Testar no insominia

   6.1 Criar a rota put de atualizar cadastro

   6.2 Testar com email já cadastrado

   6.3 Usar uma senha antiga que não está cadastrada
