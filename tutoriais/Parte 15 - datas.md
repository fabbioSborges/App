# Datas

1. Instalar a biblioteca para trabalhar com data
   ` yarn add date-fns@next`

2. Acrescentar verificação no agendamento controler

```javascript
import {startOfHour, parseISO, isBefore} from 'date-fns'
....
const horaInicio = startOfHour(parseISO(data));

//verificar se a hora informada ocorre após a hora atual
if (isBefore(horaInicio, new Date())) {
  return res.status(400).json({ mensagem: "Hora informada não permitida" });
}

//checar se o prestador de serviço já tem um agendamento nessa hora
const checkHorarioValido = await Agendamento.findOne({
  where: {
    prestador_servico_id,
    cancelado: null,
    date: horaInicio,
  },
});

if (checkHorarioValido) {
  return res.status(400).json({ mensagem: "Horario não disponivel" });
}
```

3. Testar insominia passando uma data invalida e uma data já marcada
