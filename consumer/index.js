const express = require('express')
const AMQPService = require('./amqp-service')

const app = express()
const port = 3002

// init Middleware
app.use(express.json({extended: false})); // allows to get body data from request endpoint

app.get('/consume', (req, res) => {
    res.json({data: "consumed message"})
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

async function run(){ 
  try {
    const mqClient = new AMQPService('amqp://consumer:consumer@localhost:5672')
    await mqClient.start()
    await mqClient.consume('fila1', (msg) => {
      console.log(msg)
    })

  } catch (error) {
    console.log(error)
  }
}

run().then(()=>{})