# Template Engine para envio de html handlebars

Quando estamos desenvolvendo uma aplicação web, é comum que queiramos exibir determinados dados obtidos de alguma fonte (seja um banco de dados, uma API, uma lista, etc). Para essa exibição, normalmente utilizamos de páginas HTML para que sejam renderizadas no navegador.

Porém, a criação de páginas HTML é, muitas vezes, algo improdutivo e ineficiente, principalmente quando precisamos trabalhar com grandes quantidades de dados ou até utilizar recursos das linguagens de programação (for, if, case, etc) nas páginas HTML. Para estes casos, podemos utilizar as template engines (ou view engines).

Basicamente, uma template engine serve para facilitar a criação de páginas HTML e tornar o envio e exibição de informações para estas páginas um processo mais simples e organizado.

1. https://handlebarsjs.com/

2. Instalar o handlebarsjs express
   ` yarn add express-handlebars nodemailer-express-handlebars`

3. Criar a pasta views dentro de src/app

4. criar a pasta email dentro da pasta views

5. criar a pasta layout e partials dentro da pasta email

6. Criar o default.hbs dentro de layouts

```HBS
  <div style="font-family = Arial, Helvetica, sans-serif; font-size=16px; line-height: 1.6; color #222; max-width: 600px">

    {{{ body }}}

    {{> footer}}
  </div>

```

7. Criar o footer.hbs dentro de partials

```HBS

  <br />
  Equipe massa
```

8. Criar o cancelamento.hbs dentro de email

```HBS
<strong>
  Olá, {{provider}}
</strong>
<p> Houve um cancelamento de horario confira os detalhes abaixo</p>
<p>
  <strong>Cliente: </strong> {{user}} <br />
  <strong>Data/hora: </strong> {{date}} <br />
  <br />
  <small>
    O horario está novamente disponivel para agendamento
  </small>
</p>
```

9. Criar a função configurar template no lib/mail.js

```javascript

constructor(){
  this.configureTemplates();
}
....

configureTemplates(){
    const viewPath = resolve (__dirname, '..', 'app', 'views', 'emails');
    this.transporter.use('compile',  nodemailerhbs({
      viewEngine: exphbs.create({
        layoutsDir: resolve (viewPath, 'layouts'),
        partialsDir: resolve (viewPath, 'partials'),
        defaultLayout: 'default',
        extname: '.hbs'
      }),
      viewPath,
      extName: '.hbs'
    })) // como formatar as mensagens do email
  }
```

10. Alterar a função delete no agendamentoControler

```javascript
    const agendamento = await Agendamento.findByPk(req.params.id, {
      include: [
        {
          model:User,
          as: 'prestador_servico',
          attributes: ['name', 'email']
        },
        {
          model:User,
          as: 'user',
          attributes: ['name']
        }
      ]
    });

    ....

    await Mail.sendMail({
      to: `${agendamento.prestador_servico.name} <${agendamento.prestador_servico.email}>`,
      subject: "Agendamento Cancelado",
      template: 'cancelamento',
      context: {
        provider: agendamento.prestador_servico.name,
        user: agendamento.user.name,
        date: format(
          agendamento.date,
          "'dia' dd  'de' MMMM', às ' H:mm'h'",
          {locale:pt}
          )
      }
    }).catch(console.error)

```
