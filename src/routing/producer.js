const amqp = require("amqplib")

const exchange = "direct_logs"
const message = process.argv[3]
const routingKey = process.argv[2]

async function producer() {
    const connection = await amqp.connect("amqp://localhost")
    const channel = await connection.createChannel()
    channel.assertExchange(exchange, "direct")
    channel.publish(exchange, routingKey, Buffer.from(message))
    console.log(`Message send to ${exchange} :- ${message}`)

    setTimeout(()=>{
        connection.close()
    }, 2000)
}

producer()