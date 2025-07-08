const amqp = require("amqplib")

const exchange = "topic_logs"
const message = process.argv[3]
const routingKey = process.argv[2]

async function producer() {
    const connection = await amqp.connect("amqp://localhost")
    const channel = await connection.createChannel()
    channel.assertExchange(exchange, "topic")
    channel.publish(exchange, routingKey, Buffer.from(message))
    console.log(`Message : ${message} delivered to ${exchange} with ${routingKey} key`)


    setTimeout(() => {
        connection.close()
    }, 2000)
}

producer()