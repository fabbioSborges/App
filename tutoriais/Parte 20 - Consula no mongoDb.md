#Consulta no Mongo Db

Para testar a consulta vamos criar um requisito onde o prestador de serviço lista todas as notificações

1. Criar o notificacaoControler.js

```javascript
import Notificacao from "../esquemas/Notificacoes";
import User from "../models/User";

class NotificacoesController {
  async index(req, res) {
    const isPrestadorServico = await User.findOne({
      where: { id: req.userId, prestador_servico: true },
    });
    if (!isPrestadorServico) {
      return res
        .status(401)
        .json({ mensagem: "usuario não é prestador de serviço" });
    }

    const notificacoes = await Notificacao.find({
      user: req.userId,
    })
      .sort({ createdAt: "desc" })
      .limit(20);

    return res.json(notificacoes);
  }
}

export default new NotificacoesController();
```

2. Criar a rota para chamar a função index do notificaçao controler

```javascript
  import NotificacaoCntroller from '../controller/NotificacaoCntroller'
  ....
  routes.get('/notificacoes', NotificacaoCntroller.index)

```

3. Criar a requisição get para notificação no insominia
