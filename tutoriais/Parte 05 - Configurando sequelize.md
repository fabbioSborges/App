# configurando a base de dados

1. criar o arquivo database.js dentro da pasta src/config
2. Adicionar o sequelize

```
yarn add sequelize
```

3.Instalar a dependencia sequelize-cli como dev dependence

```
yarn add sequelize-cli -D
```

4. criar na raiz o arquivo .sequelizerc

```javascript
const { resolve } = require("path");

module.exports = {
  config: resolve(__dirname, "src", "config", "database.js"), // retorna o caminho de configuração
  "models-path": resolve(__dirname, "src", "app", "models"),
  "migrations-path": resolve(__dirname, "src", "database", "migrations"),
};
```

5. Instalar as dependencias do banco de dados

```
  yarn add pg pg-hsotre
```

6. editar arquivo config/database.js

```javascript
module.exports = {
  dialect: "postgres",
  host: "localhost",
  username: "postgres",
  password: "123456",
  database: "projetoDisciplina",
  define: {
    timestamps: true,
    underscored: true,
    underscoredAll: true,
  },
};
```
