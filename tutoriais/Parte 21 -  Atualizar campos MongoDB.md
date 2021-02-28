# Atualizar campo MongoDB

1. Criar o método update no NotificaçãoControler

```javaScript
    async update(req, res){
    //const notificacao = await Notificacao.findById(req.params.id);
    const notificacao = await Notificacao.findByIdAndUpdate(
      req.params.id,
      {read: true},
      {new: true} ///atualiza e retorna o novo registro atuaizado
    );

    return res.json(notificacao)

  }
}
```

2. Chamar a rota put para atualizar a notificação
   `routes.put('/notificacoes/:id', NotificacaoCntroller.update)`
