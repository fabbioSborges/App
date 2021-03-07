# Filas ou job

1. Instalar o redis
   `docker run --name databaseRedis -p 6379:6379 -d -t redis:alpine`

2. Instalar o bee-queue
   `yarn add bee-queue`

3. criar o trabalho cancelamentoJob.js dentro da pasta src/job

```javaScript
import {format } from 'date-fns';
import pt from 'date-fns/locale/pt'
import Mail from '../../lib/mail'

class cancelamentoEmail{
 get key(){ //para cada job é necessario uma chave unica
   return 'cancelamentoEmail'
 }
 async handle({data}){ //tarefa que vai ser executada quando o processo for chamado
   const {agendamento} = data;
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

 }
}

export default new cancelamentoEmail();
```

3. Criar o arquivo de configuração do redis

```javascript
export default {
  host: "127.0.0.1",
  port: "6379",
};
```

4. Criar o arquivo queue.js dentro de src/lib

```javaScript
import Bee from 'bee-queue'
import cancelamentoMail from '../app/jobs/cancelamentoEmail'
import redisConfig from '../config/redis'

const jobs = [cancelamentoMail];

class Queue{
  constructor(){
    this.queues = {};

    this.init();
  }
  init(){
    jobs.ForEach(({key, handle}) => {
      this.queues[key] =  {
        bee: new Bee(key, {
          redis: redisConfig,
        }),
        handle
      };
    });
  }

  add(queue, job){
    return this.queues[queue].bee.createJob(job).save();
  }

  processQueue(){
    jobs.forEach(job => {
      const {bee, handle} = this.queues[jobs.key];

      bee.process(handle);
    });
  }

   handleFailed(job, err){
      console.log(`Queue ${job.queue.name}: FALHOU`, err);
    }

}

export default new Queue();
```

5. No agendamentoControler chamar o método

```javascript
await queue.add(cancelamentoEmail.key, {
  agendamento,
});
```

6. Criar dentro da pasta app o arquivo queue.js

```javascript
import queue from "./lib/queue";

queue.processQueue();

// colcoar pra rodar em outro processo para rodar a fila
```

7. no package.json colocar o script

```
    "queue": "nodemon src/queue.js"
```
