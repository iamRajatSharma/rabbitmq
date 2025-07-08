const amqp = require("amqplib")

const exchange = "direct_logs"

async function subscriber() {
    try {
        const args = process.argv.slice(2);

        const connection = await amqp.connect("amqp://localhost")
        const channel = await connection.createChannel()
        channel.assertExchange(exchange, "direct")
        const q = await channel.assertQueue('')

        for (let severity of args) {
            await channel.bindQueue(q.queue, exchange, severity)
        }

        channel.consume(q.queue, (message) => {
            console.log(`message received :- ${message.content.toString()}`)
        })

    }
    catch (err) {
        console.log(err.message)
    }
}

subscriber()