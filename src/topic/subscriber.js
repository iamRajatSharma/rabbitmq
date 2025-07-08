const amqp = require("amqplib")

const exchange = "topic_logs"

async function subscriber() {
    try {
        const binding_key = process.argv.slice(2);

        const connection = await amqp.connect("amqp://localhost")
        const channel = await connection.createChannel()
        channel.assertExchange(exchange, "topic")
        const q = await channel.assertQueue()

        for (let key of binding_key) {
            await channel.bindQueue(q.queue, exchange, key)
        }

        channel.consume(q.queue, (message) => {
            console.log(`Message: ${message.content.toString()} from ${exchange} exchange`)
        })

    }
    catch (err) {
        console.log(err.message)
    }
}

subscriber()