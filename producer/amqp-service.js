const amqplib = require('amqplib');


class AMQPService {
    constructor(uri) {
        this.uri = uri;
        this.conn = undefined
        this.channel = undefined
    }

    async start() {
        this.conn = await amqplib.connect(this.uri)
        this.channel = await this.conn.createChannel()
    }

    async publish(queue, msg) {
        await this.channel.sendToQueue(queue, Buffer.from(msg))
        await this.channel.close()
    }

    async consume(queue, callback) {
        await this.channel.consume(queue, (msg) => {
            callback(msg.content.toString())
            this.channel.ack(msg)
        })
    } 
}


module.exports = AMQPService