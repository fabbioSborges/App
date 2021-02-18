# Autenticação do Usuario

1. instalar a dependencia
   ` yarn add jsonwebtoken`

2. Criar na pasta controllers SessionControler

```javaScript


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
```

3. Criar uma nova rota

   ```javascript
   import SessionController from "./app/controllers/sessionControler";

   routes.post("/sessions", SessionController.store);
   ```

4. Testar no insominia

5. Separar o id unico em um arquivo de configuração
   5.1. Criar um arquivo auth.js dentro da pasta de configuração
