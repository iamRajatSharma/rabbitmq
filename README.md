# Learn RabbitMQ

This project demonstrates different messaging patterns using [RabbitMQ](https://www.rabbitmq.com/) with Node.js and the [amqplib](https://www.npmjs.com/package/amqplib) library. It includes examples for:

- Simple Queue (Producer/Consumer)
- Publish/Subscribe (Fanout Exchange)
- Routing (Direct Exchange)
- Topics (Topic Exchange)

## Prerequisites

- [Node.js](https://nodejs.org/) (v14 or higher recommended)
- [Docker](https://www.docker.com/) (for running RabbitMQ)

## Running RabbitMQ with Docker

Start a RabbitMQ instance with the management UI:

```sh
docker run -d --name rabbitmq -p 5672:5672 -p 15672:15672 rabbitmq:3-management
```

- RabbitMQ will be available at `amqp://localhost:5672`
- Management UI: [http://localhost:15672/](http://localhost:15672/) (default user: `guest`, password: `guest`)

## Install Dependencies

```sh
npm install
```

## Project Structure

```
src/
  pub-sub/
    producer.js
    subscriber.js
  queue/
    producer.js
    receiver.js
  routing/
    producer.js
    subscriber.js
  topic/
    producer.js
    subscriber.js
```

## Usage

### 1. Simple Queue

**Producer:**
```sh
node src/queue/producer.js "Hello Queue"
```

**Receiver:**
```sh
node src/queue/receiver.js
```

---

### 2. Publish/Subscribe (Fanout)

**Producer:**
```sh
node src/pub-sub/producer.js "Hello Subscribers"
```

**Subscriber:**
```sh
node src/pub-sub/subscriber.js
```

---

### 3. Routing (Direct Exchange)

**Producer:**
```sh
node src/routing/producer.js error "Error message"
```

**Subscriber (listen to 'error' and 'info'):**
```sh
node src/routing/subscriber.js error info
```

---

### 4. Topics (Topic Exchange)

**Producer:**
```sh
node src/topic/producer.js "kern.critical" "A critical kernel error"
```

**Subscriber (listen to all kernel messages):**
```sh
node src/topic/subscriber.js "kern.*"
```

## Stopping RabbitMQ

```sh
docker stop rabbitmq
docker rm rabbitmq
```

---

## License

ISC