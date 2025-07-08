const amqp = require("amqplib")

const queue_name = "plain_queue"
const message = process.argv[2]

async function producer() {
    const connection = await amqp.connect("amqp://localhost")
    const channel = await connection.createChannel()
    channel.assertQueue(queue_name)
    channel.sendToQueue(queue_name, Buffer.from(message))
    console.log(`message is :- ${message}`)
}
producer()