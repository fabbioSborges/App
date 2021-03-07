import {format, parseISO } from 'date-fns';
import pt from 'date-fns/locale/pt'
import Mail from '../../lib/mail'
 
class cancelamentoEmail{
  get key(){ //para cada job é necessario uma chave unica
    return 'cancelamentoEmail'
  }
  async handle({data}){ //tarefa que vai ser executada quando o processo for chamado
    const {agendamento} = data;

    console.log('A fila executou');

    await Mail.senddMail({
      to: `${agendamento.prestador_servico.name} <${agendamento.prestador_servico.email}>`,
      subject: "Agendamento Cancelado", 
      template: 'cancelamento',
      context: {
        provider: agendamento.prestador_servico.name,
        user: agendamento.user.name,
        date: format(
          parseISO(agendamento.date), 
          "'dia' dd  'de' MMMM', às ' H:mm'h'",
          {locale:pt}
          ) 
      }
    }).catch(console.error)

  }
}

export default new cancelamentoEmail();