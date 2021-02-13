# Controler de Usuario

index
show
store
update
delete

1. Criar na pasta controllers o arquivo UserControler.js

2. Implementar o código

   ```javascript
   import User from "../models/User";

   class userController {
     async store(req, res) {
       const { id, name, email, prestador_servico } = await User.create(
         req.body
       );

       return res.json({ id, name, email, prestador_servico });
     }
   }

   export default new userController();
   ```

3. No arquivo de routes importar o Usercontroller

   ```javascript
   import { Router } from "express"; // importr apenas o Routers do express

   import UserController from "./app/controllers/UserController";

   const routes = new Router();

   routes.post("/user", UserController.store);

   routes.get("/", (req, res) => res.json({ mensagem: "helo world" }));

   export default routes;
   ```

4. Testar a rota usando o insominia
   4.1. Criar uma nova workspace
   4.2. Criar uma pasta User
   4.3. Criar uma nova variavel base
   `{ "base_url": "http://localhost:3333" }`
   4.4. Criar uma requisição do tipo post com body json para criar usuario

   ```
       { "name": Sequelize.STRING,
         "email": Sequelize.STRING,
         "password_hash": Sequelize.STRING,
       }
   ```

5. Verificar se existe usuario com email cadastrado
   Adicionar o codigo no controler store

   ```javascript
   const userExists = await User.findOne({ where: { email: req.body.email } });

   if (userExists) {
     return res.status(400).json({ mensagem: "Usuario já existe" });
   }
   ```

6. Criptografia da senha
   6.1. Instalar o bcryptjs
   `yarn add bcryptjs`
   6.2. Alterar o model user

```javaScript
    import Sequelize, {Model} from 'sequelize'
    import bcrypt from 'bcryptjs'

    class User extends Model{
      static init(sequelize){
        super.init({
          name: Sequelize.STRING,
          email: Sequelize.STRING,
          password: Sequelize.VIRTUAL,//nunca vai existir na base de dados
          password_hash: Sequelize.STRING,
          prestador_servico: Sequelize.BOOLEAN,
        }, {
          sequelize,
        })
        this.addHook('beforeSave', async (user) => {
          if(user.password){
            user.password_hash = await bcrypt.hash(user.password, 8);
          }

        });

        return this;
      }
    }

    export default User;
```
