import User from '../models/User'
import Agendamento from '../models/Aagendamentos'
import File from '../models/Files'
import {startOfHour, parseISO, isBefore} from 'date-fns'
import * as Yup from 'yup'

class AgendamentoController{
  async index(req, res){

    const {page = 1} = req.query;

    const agendamentos = await Agendamento.findAll({
      where: {user_id:req.userId, cancelado: null},
      order: ['date'],
      limit: 20, //limit de registros carregados do banco
      offset: (page-1)*20, //quantos registro quer pular
      attributes: ['id', 'date', 'prestador_servico_id'],
      include:[
        {
          model: User, 
          as:  'prestador_servico',
          attributes:['name', 'email', 'avatar_id'],
          include:[
            {
              model:File,
              as: 'avatar',
              attributes: ['url', 'id', 'path']
            }
          ]
        }
      ]
    });

    return res.json(agendamentos);
  }
  
  async store(req,res){
    //validar os campos
    const esquema = Yup.object().shape({
      data: Yup.date().required(),
      prestador_servico_id: Yup.number().required(),
    })
    if(!(await esquema.isValid(req.body))){
      return res.status(400).json({mensagem: "Campos invalidos"})
    }

    const {data, prestador_servico_id} =  req.body;

    //checar se o id repassado é de um prestador de serviço
    const prestadorServico = await User.findOne({
      where: {
        id:prestador_servico_id, 
        prestador_servico: true
      }
    })
    
    if(!prestadorServico){
      return res.status(401).json({mensagem: "Id não é de um prestador de serviço"})
    }

    const horaInicio = startOfHour(parseISO(data));

    //verificar se a hora informada ocorre após a hora atual
    if(isBefore(horaInicio, new Date())){
      return res.status(400).json({mensagem: "Hora informada não permitida"})
    }

    //checar se o prestador de serviço já tem um agendamento nessa hora
    const checkHorarioValido = await Agendamento.findOne({
      where: {
        prestador_servico_id, 
        cancelado: null,
        date: horaInicio
        
      }
    })

    if(checkHorarioValido){
      return res.status(400).json({mensagem: "Horario não disponivel"})
    }
    
    const agendamento = await Agendamento.create({
      user_id: req.userId, 
      prestador_servico_id, 
      date: data
    })

    return res.json(agendamento);

  }
}

export default new AgendamentoController();