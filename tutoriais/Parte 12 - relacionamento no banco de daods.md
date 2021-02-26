# relacionamento do banco de dados

1. Criar uma migrate para adicionar uma coluna na tabela usaurio que relaciona o usario com o local da foto

   `yarn sequelize migration:create --name=add-Campo-Avatar-Tabela-User `

   ```javascript
   "use strict";

   const sequelize = require("sequelize");

   module.exports = {
     up: async (queryInterface, Sequelize) => {
       await queryInterface.addColumn("users", "avatar_id", {
         type: sequelize.INTEGER,
         references: {
           model: "files",
           key: "id",
           onUpdate: "CASCADE",
           onDelete: "SET NULL",
           allowNull: true,
         },
       });
     },

     down: async (queryInterface, Sequelize) => {
       await queryInterface.removeColumn("avatar_id");
     },
   };
   ```

   `yarn sequelize db:migrate`

2. Alterar o model de User para aceitar o relacionamento

```javascript
....
    static associate(models){
        this.belongsTo(models.File, {foreignKey: 'avatar_id', as:'avatar'})
        //o model de File pertence a tabela de usuario
        //as: nome do relacinamento
      }

```

3. Adicionar o relacionamento no arquivo de banco de dados database/index.js

```javascript
  init(){
      this.connection = new Sequelize(databaseConfig);

      models
        .map(model => model.init(this.connection))
        .map(model => model.associate && model.associate(this.connection.models));
    }
```

4. Testar a rota /file no insominia

```json
{
  "name": "Fabbio",
  "email": "fabbio8@gmail.com",
  "passwordAntigo": "123456789",
  "password": "123456789",
  "confirmarPassword": "123456789",
  "avatar_id": 1
}
```
