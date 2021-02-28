# Operador beteween banco de dados

a expressão a ser testada no intervalo definido por begin_expression e end_expression. test_expression precisa ser do mesmo tipo de dados que begin_expression e end_expression.

Vamos testar se um prestador de serviço possui serviços agendados em um dia especifico

1.  Criar o controller agendaControler.js

```javascript
import Agendamento from "../models/Aagendamentos";
import User from "../models/User";
//importar o operador do sequelize
import { Op } from "sequelize";
// informar a primeira e a ultima hora do dia
import { startOfDay, endOfDay, parseISO } from "date-fns";

class AgendaController {
  async index(req, res) {
    const isPrestadorServico = await User.findOne({
      where: { id: req.userId, prestador_servico: true },
    });

    if (!isPrestadorServico) {
      return res
        .status(401)
        .json({ mensagem: "Usuario não é um prestador de serviço" });
    }

    const { date } = req.query;
    const parseDate = parseISO(date);

    const agendamentos = await Agendamento.findAll({
      where: {
        prestador_servico_id: req.userId,
        cancelado: null,
        date: {
          [Op.between]: [startOfDay(parseDate), endOfDay(parseDate)],
        },
      },
      order: ["date"],
    });

    return res.json(agendamentos);
  }
}

export default new AgendaController();
```

2. Criar a rota para acessar o método

```javascript
routes.get("/agendaservico", AgendaController.index);
```

3. Criar a requisição get no insomnia
   3.1 Logar como prestador de serviço
   3.2 passar uma query com a data de pesquisa
