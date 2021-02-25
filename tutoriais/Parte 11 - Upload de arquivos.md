# upload de arquivos

Duas formas

- Enviar a imagem junto com outros dados na hora da criação a partir de uma requisição
- Upload de arquivos isolados
  Salvar a referencia da imagem no servidor do banco de dados
  A imagem é salva em uma pasta do servidor

1. Instalar uma biblioteca para lidar com arquivos nas requisições
   Instlar o multer - Formato multi parter format data
   `yarn add multer`
2. Criar uma pasta na raiz do projeto chamada src/temp/upload

3. dentro da pasta src/config criar o arquivo multer.js

   ```javascript
   import multer from "multer";
   import crypto from "crypto"; //gerar caractere aleatorio
   // extname - pegar extensão do arquivo e resolve para o caminho do diretorio
   import { extname, resolve } from "path";

   export default {
     /* Storage: como o multer vai guardar os arquivos de imagem.
           vamos usar o disco da aplicação
       */
     storage: multer.diskStorage({
       destination: resolve(__dirname, "..", "..", "tmp", "uploads"),
       filename: (req, file, cb) => {
         //como vai formatar o nome do arquivo da imagem
         /*  adicionar um codigo único no arquivo de upload para isso vamos usar o crypto
               função randomBytes que recebe como parametro a quantidade de caracteres que deve 
               gerar e uma função de callbacck para tratar a resposta
           */
         crypto.randomBytes(16, (err, res) => {
           if (err) return cb(err);
           return cb(null, res.toString("hex") + extname(file.originalname));
         });
       },
     }),
   };
   ```

4. Criar uma tabela no banco de dados para armazenar o arquivo

   4.1 Criar a migration da tabela
   `yarn sequelize migration:create --name=create-files`
   4.2 migration

   ```javascript
   "use strict";

   module.exports = {
     up: async (queryInterface, Sequelize) => {
       await queryInterface.createTable("files", {
         id: {
           type: Sequelize.INTEGER,
           allowNull: false,
           autoIncrement: true,
           primaryKey: true,
         },
         name: {
           type: Sequelize.STRING,
           allowNull: false,
         },
         path: {
           type: Sequelize.STRING,
           allowNull: false,
           unique: true,
         },
         created_at: {
           type: Sequelize.DATE,
           allowNull: false,
         },
         updated_at: {
           type: Sequelize.DATE,
           allowNull: false,
         },
       });
     },

     down: async (queryInterface, Sequelize) => {
       await queryInterface.dropTable("files");
     },
   };
   ```

   4.3. ` yarn sequelize db:migrate`

5. Criar o model File

   ```javascript
   import Sequelize, { Model } from "sequelize";

   class File extends Model {
     static init(sequelize) {
       super.init(
         {
           name: Sequelize.STRING,
           path: Sequelize.STRING,
         },
         {
           sequelize,
         }
       );

       return this;
     }
   }

   export default File;
   ```

6. Alterar o arquivo index.js dentro de database para importar o model File

   ```javascript
   import File from '../app/models/Files'

   ...

   const models = [User, File]
   ```

7. Criar o FileControler

```javascript
import File from "../models/Files";

class FileControler {
  async store(req, res) {
    const { originalname: name, filename: path } = req.file;

    const file = await File.create({
      name,
      path,
    });

    return res.json(file);
  }
}

export default new FileControler();
```

8. criar uma rota para upload de arquivos

   ```javascript

   import multer from 'multer';
   import FileController from './app/controllers/fileControler'

   ....

   const upload = multer(multerConfig);

   ....

    routes.post('/file',upload.single('file') , FileController.store)
   ```

9. Criar a rota de teste no insominia

   9.1 Cria pasta files

   9.2 Criar a rota post '/file' com corpo da requisiçao multipart

   9.3 Passar o token para garantir que o usuario vai estar logado
