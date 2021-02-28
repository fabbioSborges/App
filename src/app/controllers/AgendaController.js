import Agendamento from '../models/Aagendamentos'
import User from '../models/User'
//importar o operador do sequelize
import {Op} from 'sequelize'
// informar a primeira e a ultima hora do dia
import {startOfDay, endOfDay, parseISO} from 'date-fns'


class AgendaController{
  async index(req, res){
    const isPrestadorServico = await User.findOne({
      where:{id: req.userId, prestador_servico:true}
    })

    if(!isPrestadorServico){
      return res.status(401).json({mensagem: "Usuario não é um prestador de serviço"});
    }

    const {date} = req.query;
    const parseDate = parseISO(date);

    const agendamentos = await Agendamento.findAll({
      where: {
        prestador_servico_id: req.userId,
        cancelado: null,
        date:{
          [Op.between]: [
            startOfDay(parseDate),
            endOfDay(parseDate)
          ]
        }
      },
      order:['date']
    })

    return res.json(agendamentos);
  }
}

export default new AgendaController();