export default{ //enviar email por meio do smtp
  host: 'smtp.mailtrap.io', 
  port: '2525', 
  //secure: 'false',
  auth: { //autenticação do email
    user: "52769f5fa8a152",
    pass: "c0c30cab1299d3"
  },
  default:{ // remetente padrão para todos os email enviados
    from: 'Fabio Borges <fabbio@app.com>'
  } 
}

