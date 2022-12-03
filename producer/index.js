const express = require('express')
const AMQPService = require('./amqp-service')
const app = express()
const port = 3000

// init Middleware
app.use(express.json({extended: false})); // allows to get body data from request endpoint

app.put('/produce', async (req, res) => {
    try {
      const mqClient = new AMQPService('amqp://admin:admin@localhost:5672')
      await mqClient.start()
      await mqClient.publish('fila1', JSON.stringify(req.body))
      res.json(`mensagem ${req.body} publicada na fila1`)
    } catch (error) {
      console.log(error)
      res.status(503).send(error)
    }
    
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})