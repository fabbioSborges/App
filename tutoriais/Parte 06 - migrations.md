# Migrations Usuario

1. yarn sequelize migration:create --name=create-users

2. no arquivo migratios colocar o codigo

   ```javascript
   "use strict";

   const { password } = require("../../config/database");

   module.exports = {
     up: async (queryInterface, Sequelize) => {
       await queryInterface.createTable("users", {
         id: {
           type: Sequelize.INTEGER,
           allowNull: false,
           autoIncrement: true,
           primaryKey: true,
         },
         name: {
           type: Sequelize.STRING,
           allowNull: false,
         },
         email: {
           type: Sequelize.STRING,
           allowNull: false,
           unique: true,
         },
         password_hash: {
           type: Sequelize.STRING,
           allowNull: false,
         },
         prestadorServico: {
           type: Sequelize.BOOLEAN,
           defaultValue: false,
           allowNull: false,
         },
         created_at: {
           type: Sequelize.DATE,
           allowNull: false,
         },
         updated_at: {
           type: Sequelize.DATE,
           allowNull: false,
         },
       });
     },

     down: async (queryInterface) => {
       await queryInterface.dropTable("users");
     },
   };
   ```

3. yarn sequelize db:migrate

4. desfazer uma migrate

```
yarn sequelize db:migrate:undo
yarn sequelize db:migrate:undo:all
```

5. Criar na pasta app/models/ o arquivo User.js

```javascript
import Sequelize, { Model } from "sequelize";

class User extends Model {
  static init(sequelize) {
    super.init(
      {
        name: Sequelize.STRING,
        email: Sequelize.STRING,
        password: Sequelize.STRING,
        restadorServico: Sequelize.BOOLEAN,
      },
      {
        sequelize,
      }
    );
  }
}

export default User;
```

7. criar arquivo index.js na pasta src/database

   ```javaScript
       import Sequelize from  'sequelize'

       import User from '../app/models/User'

       import databaseConfig from '../config/database'

       const models = [User]

       class Database{
         constructor(){
           this.init();
         }
         init(){
           this.connection = new Sequelize(databaseConfig);

           models.map(model => model.init(this.connection));
         }
       }

       export default new Database();
   ```

8. Adicionar no arquivo src/app.js

   ```
   import './database'
   ```

9. configurar a rota para salvar usuario

   ```javascript
   import User from "./app/models/User";

   routes.get("/user", async (req, res) => {
     const user = await User.create({
       name: "Fabbio Anderson",
       email: "fabio@uespi.br",
       password_hash: "123456",
     });
     res.json(user);
   });
   ```
