# Inserindo esquema no MongoDB

1. Criar uma pasta esquemas dentro da pasta app

2. Criar o esquema de notificacoes

```javascript
import mongoose from "mongoose";

const NotificationSchema = new mongoose.Schema(
  {
    content: {
      type: String,
      required: true,
    },
    user: {
      type: Number,
      required: true,
    },
    read: {
      type: Boolean,
      required: true,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Notificacoes", NotificationSchema);
```

3. Atualizar o AgendamentoControler para toda vez que tiver um agendamento ele salvar uma notificação no mongoDB

```javascript
  import {format} from 'date-fns'
  import pt from 'date-fns/locale/pt'
  ....

  // Notificar prestador de serviço
    const user = await User.findByPk(req.userId);
    const dataFormatada = format(
      horaInicio,
      "'dia' dd  'de' MMMM', às ' H:mm'h'",
      {locale:pt}
      );


    const notificacoes = await Notificacoes.create({
      content: `Novo agendamento de ${user.name} para o ${dataFormatada}`,
      user: prestador_servico_id
    })
```
