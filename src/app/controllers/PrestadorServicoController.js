import User from '../models/User'
import File from '../models/Files'

class PrestadorServicoController{
  async index(req, res){
    const prestadoservico = await User.findAll({
      where: {prestador_servico: true},
      attributes: ['id', 'name', 'avatar_id'],
      include: [
        {
          model : File,
          as: 'avatar',
          atributes: ['name', 'path',  'url']
        }]
    })
    return res.json(prestadoservico)
  }
}

export default new PrestadorServicoController();