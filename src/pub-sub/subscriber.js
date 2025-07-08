const amqp = require("amqplib")

const exchange = "chat"

async function subscriber() {
    try {
        const connection = await amqp.connect("amqp://localhost")
        const channel = await connection.createChannel()
        channel.assertExchange(exchange, 'fanout')
        const q = channel.assertQueue('')
        channel.bindQueue((await q).queue, exchange, '')
        channel.consume(q.queue, (message) => {
            console.log(`Message Received: ${message.content.toString()}`)
        })
    }
    catch (err) {
        console.log(err.message)
    }

}

subscriber()