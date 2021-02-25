# validar campos de dados de entrada

1. Usar a biblioteca yup que é um esquema validation.
   Forma de definir os campos que vão estar presentes no corpo da função
2. Instalar o yup
   ` yarn add yup`
3. Controler usuario

   import \* as Yup from 'yup'

   3.1 No inico do método de store usuario colocar o codigo

   ```javascript
   const esquema = Yup.object().shape({
     name: Yup.string().required(), // campo name é do tipo string e é obrigatorio
     email: Yup.string().email().required(),
     password: Yup.string().required().min(6),
   });
   if (!(await esquema.isValid(req.body))) {
     return res.status(400).json({ mensagem: "Campos invalidos" });
   }
   ```

   3.2 No inico do método de update usuario colocar o codigo

   ```javascript
   //validar os campos
   const esquema = Yup.object().shape({
     name: Yup.string(),
     email: Yup.string().email(),
     passwordAntigo: Yup.string().min(6),
     password: Yup.string()
       .min(6)
       .when("passwordAntigo", (passwordAntigo, field) =>
         passwordAntigo ? field.required() : field
       ), //validação condicional
     confirmarPassword: Yup.string().when("password", (password, field) =>
       password ? field.required().oneOf([Yup.ref("password")]) : field
     ), //validar o novo password
   });

   if (!(await esquema.isValid(req.body))) {
     return res.status(400).json({ mensagem: "Campos invalidos" });
   }
   ```

4. Validar tela de login sesion.js

   ```javascript
   //validar os campos
   const esquema = Yup.object().shape({
     email: Yup.string().email().required(),
     password: Yup.string().required(),
   });
   if (!(await esquema.isValid(req.body))) {
     return res.status(400).json({ mensagem: "Campos invalidos" });
   }
   ```
