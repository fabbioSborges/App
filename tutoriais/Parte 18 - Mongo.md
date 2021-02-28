# BAnco de dados NoSql

1.  Intalar o docker do mongoDB
    `docker run --name databaseMongo -p 27017:27017 -d -t mongo`

        http://localhost:27017/

2.  Intalar a dependencia mongoose que é o ORM para trabalhar com o mongoDB
    ` yarn add mongoose`

3.  No arquivo database/index.js instanciar a conexão do mongo

```javascript
    import mongoose from 'mongoose'

    ....

    this.mongo();

    ....

    mongo(){
    this.mongoConnection = mongoose.connect(
      'mongodb://localhost:27017/app',
      {useNewUrlParser: true, useFindAndModify: true}
    )
  }

```
