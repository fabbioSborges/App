import Notificacao from '../esquemas/Notificacoes'
import User from '../models/User';


class NotificacoesController{
  async index(req, res){
    const isPrestadorServico = await User.findOne({
      where: {id: req.userId, prestador_servico: true}
    })
    if(!isPrestadorServico){
      return res.status(401).json({mensagem: "usuario não é prestador de serviço"})
    }

    const notificacoes = await Notificacao.find({
      user: req.userId
    }).sort({createdAt: 'desc'}).limit(20);

    return res.json(notificacoes)
  }

  async update(req, res){
    //const notificacao = await Notificacao.findById(req.params.id);
    const notificacao = await Notificacao.findByIdAndUpdate(
      req.params.id,
      {read: true},
      {new: true} ///atualiza e retorna o novo registro atuaizado
    );

    return res.json(notificacao)

  }
}

export default new NotificacoesController();