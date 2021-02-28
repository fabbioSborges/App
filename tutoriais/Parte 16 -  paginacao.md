# Paginação

1. Criar a função index no agendamentoController

```javascript

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

```

2. testar o insominia passando a query page=1
