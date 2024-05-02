const { Kafka } = require('kafkajs');

// Create Kafka instance
const kafka = new Kafka({
  clientId: 'consumer-app',
  brokers: ['localhost:9092']
});

// Create consumer
const consumer = kafka.consumer({ groupId: 'test-group' });

const consumeMessages = async () => {
  await consumer.connect();
  await consumer.subscribe({ topic: 'test-topic', fromBeginning: true });

  await consumer.run({
    eachMessage: async ({ topic, partition, message }) => {
      console.log({
        value: message.value.toString()
      });
    }
  });
};

// Run consumer
consumeMessages()
  .catch(error => console.error(error));
