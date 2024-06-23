const amqp = require('amqplib');

const message = {
  description: 'test'
}

const connection = async () => {
  try {
    const connect = await amqp.connect(process.env.RABBITMQ_URL);
    const channel = await connect.createChannel();
    const assertion = await channel.assertQueue('jobsQueue');

    channel.sendToQueue('jobsQueue', Buffer.from(JSON.stringify(message)));
    console.log('Message sent', message);
  } catch (error) {
    console.error('Error with sending msg:', error);
  }
}

connection();
