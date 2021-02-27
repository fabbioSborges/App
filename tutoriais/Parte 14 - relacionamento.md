# Criar relacionamento n para para n

1. Criar a tabela agendamento a partir de uma migrate
   `yarn sequelize migration:create --name:create-agendamento`

   ```javascript
   "use strict";

   module.exports = {
     up: async (queryInterface, Sequelize) => {
       await queryInterface.createTable("agendamentos", {
         id: {
           type: Sequelize.INTEGER,
           allowNull: false,
           autoIncrement: true,
           primaryKey: true,
         },
         date: {
           type: Sequelize.DATE,
           allowNull: false,
         },
         user_id: {
           type: Sequelize.INTEGER,
           references: { model: "users", key: "id" },
           onUpdate: "CASCADE",
           onDelete: "SET NULL",
           allowNull: true,
         },
         prestador_servico_id: {
           type: Sequelize.INTEGER,
           references: { model: "users", key: "id" },
           onUpdate: "CASCADE",
           onDelete: "SET NULL",
           allowNull: true,
         },
         cancelado: {
           type: Sequelize.DATE,
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

     down: async (queryInterface, Sequelize) => {
       await queryInterface.dropTable("agendamentos");
     },
   };
   ```

   ```
     yarn sequelize db:migrate
   ```

2. Criar o model de Agendamento

   ```javascript
   import Sequelize, { Model } from "sequelize";

   class Agendamentos extends Model {
     static init(sequelize) {
       super.init(
         {
           date: Sequelize.DATE,
           cancelado: Sequelize.DATE,
         },
         {
           sequelize,
         }
       );

       return this;
     }
     static associate(models) {
       this.belongsTo(models.User, { foreignKey: "user_id", as: "user" });
       this.belongsTo(models.User, {
         foreignKey: "prestador_servico_id",
         as: "prestador_servico",
       });
       //o model de uuario pertence a tabela de agendamento
       // as: nome do relacionamento
     }
   }

   export default Agendamentos;
   ```

3. Instanciar o agndamento denstro do database\index.js

```javascript
   import Agendamento from '../app/models/Aagendamentos'

  ....

  const models = [User, File, Agendamento]

```

4. Criar o controler de agendamento

   ```javascript
   import User from "../models/User";
   import Agendamento from "../models/Aagendamentos";
   import * as Yup from "yup";

   class AgendamentoController {
     async store(req, res) {
       //validar os campos
       const esquema = Yup.object().shape({
         data: Yup.date().required(),
         prestador_servico_id: Yup.number().required(),
       });
       if (!(await esquema.isValid(req.body))) {
         return res.status(400).json({ mensagem: "Campos invalidos" });
       }

       const { data, prestador_servico_id } = req.body;

       //checar se o id repassado é de um prestador de serviço
       const prestadorServico = await User.findOne({
         where: {
           id: prestador_servico_id,
           prestador_servico: true,
         },
       });

       if (!prestadorServico) {
         return res
           .status(401)
           .json({ mensagem: "Id não é de um prestador de serviço" });
       }

       const agendamento = await Agendamento.create({
         user_id: req.userId,
         prestador_servico_id,
         date: data,
       });

       return res.json(agendamento);
     }
   }

   export default new AgendamentoController();
   ```

5. Criar a rota para agendamento

```javascript
    import AgendamentoController from './app/controllers/AgendamentoController'

    ....

    routes.post('/agendamento', AgendamentoController.store)
```

6. testar a rota no insominia passando um prestador se serviço valido e não valido

```javascript
{
	"data": "2021-02-25T18:00:00-03:00",
	"prestador_servico_id": 3
}
```
