const amqp = require("amqplib")

const exchange = "chat"
const message = process.argv[2]

async function producer() {
    const connection = await amqp.connect("amqp://localhost")
    const channel = await connection.createChannel()
    channel.assertExchange(exchange, 'fanout')
    channel.publish(exchange, '', Buffer.from(message))
    console.log(`Message send: ${message}`)
}

producer()