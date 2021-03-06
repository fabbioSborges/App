# enviando email pela aplicação

1. Instalar o nodemailer
   `yarn add nodemailer`
2. Configurar o serviço de email

- Amazon SES
- Mailgun
- Sparkpost
- Mandril (mailChimp)
- MailTrap

3. Criar uma conta no mailtrap

4. Criar um aruivo de configuração no email em src/config/mail.js

```javascript
export default {
  //enviar email por meio do smtp
  host: "smtp.mailtrap.io",
  port: "2525",
  auth: {
    //autenticação do email
    user: "52769f5fa8a152",
    pass: "c0c30cab1299d3",
  },
  default: {
    // remetente padrão para todos os email enviados
    from: "Fabio Borges <fabbio@app.com>",
  },
};
```

4. Criar o arquivo mail.js em src/lib/mail.js

```javascript
import nodemailer from "nodemailer";
import mailConfig from "../config/mail";

class Mail {
  constructor() {
    const { host, port, secure, auth } = mailConfig;

    this.transporter = nodemailer.createTransport({
      host,
      port,
      secure,
      auth: auth.user ? auth : null,
    });
  }

  sendMail(mensagem) {
    return this.transporter.sendMail({
      ...mailConfig.default,
      ...mensagem,
    });
  }
}

export default new Mail();
```

5. Chamar o método Mail.sendmail no delete do agendamento controler

   ```javascript
   const agendamento = await Agendamento.findByPk(req.params.id, {
      include: [
        {
          model:User,
          as: 'prestador_servico',
          attributes: ['name', 'email']
        }
      ]
    });
   ....

   await Mail.sendMail({
         to: `${agendamento.prestador_servico.name} <${agendamento.prestador_servico.email}>`,
         subject: "Agendamento Cancelado",
         text: 'Você tem um novo cancelamento!',
      }).catch(console.error)
   ```

```

```
