const amqp = require("amqplib")

const queue_name = "plain_queue"
// const message = process.argv[2]

async function consumer() {
    const connection = await amqp.connect("amqp://localhost")
    const channel = await connection.createChannel()
    channel.assertQueue(queue_name)
    channel.consume(queue_name, (message) => {
        console.log(`Message receved :- ${message.content.toString()}`)
    })
}

consumer()