const amqp = require('amqplib');

const connection = async () => {
  try {
    const connect = await amqp.connect(process.env.RABBITMQ_URL);
    const channel = await connect.createChannel();
    const assertion = await channel.assertQueue('jobsQueue');

    channel.consume('jobsQueue', (msg) => {
      console.log(`Received message: ${msg.content.toString()}`)
    })
  } catch (error) {
    console.error('Error with sending msg:', error);
  }
}

connection();
