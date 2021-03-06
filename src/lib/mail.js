import nodemailer from 'nodemailer'
import mailConfig from '../config/mail'

class Mail{
  constructor(){
    const {host, port, secure, auth} = mailConfig;

    this.transporter = nodemailer.createTransport({
      host, 
      port,
      secure,
      auth: auth.user ? auth: null,
    });
  }

  sendMail(mensagem){
    return this.transporter.sendMail({
      ... mailConfig.default,
      ... mensagem
    });
  }
}

export default new Mail()