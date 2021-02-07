# Configurando padrão de código

- Utilizar ferramentas para automatizar a padronização do código
- Existe vários padrões
- VAmos usar o padrão da "airbnb"

1. Adicionar o eslint
   relaizar o lint do código. Verificar os padrões do codigo
   ```
   yarn add eslint -D
   ```
2. Inicializar o arquivo de configuação do EsLint
   ```
   yarn eslint --init
   ```
   Nas perguntas marcar as seguintes:
   - primeira: selecionar a terceira opção
   - segunda: selecionar a primeira opção
   - Terceira: selecionar a terceira opção
   - Quarta: Does your project use TypeScript? No
   - QUinta: selecionar Node
   - Sexta: selecionar primeira opção
   - Sétima: selecionar airbnb
   - Oitava: selecionar JavaScript
   - nona: Digitar 'y'
3. Remover o package.lock.json e executar yarn

4. Instlar o prettier

   ```
   yarn add prettier eslint-config-prettier eslint-plugin-prettier -D
   ```

5. Adicionar o seguinte trecho no arquivo de configuração do vscode

   ```javascript
       "eslint.formatOnSave": false,

       "eslint.autoFixOnSave": true,
       "editor.codeActionsOnSave": {
           "source.fixAll.eslint": true
       },
       "eslint.validate": [
           {
               "language":"javascript",
               "autoFix": true
           }
           {
               "language":"javascriptreact",
               "autoFix": true
           }
           {
               "language":"typecript",
               "autoFix": true
           }
           {
               "language":"typecriptreact",
               "autoFix": true
           }
       ],
   ```

6. Adicionar o seguinte trecho no arquivo de configuração .eslintrc.js

   ```javascript
   module.exports = {
     env: {
       es2021: true,
       node: true,
     },
     extends: ["airbnb-base", "prettier"],
     plugins: ["prettier"],
     parserOptions: {
       ecmaVersion: 12,
       sourceType: "module",
     },
     rules: {
       "prettier/prettier": "error",
       "class-method-use-this": "off",
       "no-param-reassign": "off",
       camelcase: "off",
       "no-unused-vars": ["erro", { argsIgnorePatern: "next" }], //ignora por declarar variaveis que não vou usar
     },
   };
   ```
