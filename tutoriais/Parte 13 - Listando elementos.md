# Listar os prestadores de serviços da aplicação

1. Criar o controler Prestador serviço

```javascript
import User from "../models/User";
import File from "../models/Files";

class PrestadorServicoController {
  async index(req, res) {
    const prestadoservico = await User.findAll({
      where: { prestador_servico: true },
      attributes: ["id", "name", "avatar_id"], //listar os atributos que retorna na pesquisa
      include: [
        //incluir o relacionamento
        {
          model: File,
          as: "avatar",
          atributes: ["name", "path", "url"],
        },
      ],
    });
    return res.json(prestadoservico);
  }
}

export default new PrestadorServicoController();
```

2. no model de file inserir o campo URL como virtual

   ```javascript
   ....
     url: {
             type: Sequelize.VIRTUAL,
             get() {
               return `http://localhost:3333/files/${this.path}`;
             }
           }

   ```

3. ADicionar no app.js o middleware para envio de arquivos estatico

```javascript
    import path from 'path'
    ....
    //dentro do metodo middleware
    this.server.use('/files', express.static(path.resolve(__dirname, '..', 'tmp', 'uploads')))
```

4. Criar a rota prestador de serviço

```javascript
routes.get("/prestadoservico", PrestadorServicoController.index);
```

5. Tetar a requisição get no insomina
