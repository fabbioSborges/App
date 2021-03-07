import nodemailer from 'nodemailer'
import mailConfig from '../config/mail'
import exphbs from 'express-handlebars'
import nodemailerhbs from 'nodemailer-express-handlebars'
import {extname, resolve} from 'path'

class Mail{
  constructor(){
    const {host, port, secure, auth} = mailConfig;

    this.transporter = nodemailer.createTransport({
      host, 
      port,
      secure,
      auth: auth.user ? auth: null,
    });

    this.configureTemplates();
  }

  sendMail(mensagem){
    return this.transporter.sendMail({
      ... mailConfig.default,
      ... mensagem
    });
  }

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

}

export default new Mail()