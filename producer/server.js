const { Kafka } = require('kafkajs');

// Create Kafka instance
const kafka = new Kafka({
  clientId: 'producer-app',
  brokers: ['localhost:9092']
});

// Create producer
const producer = kafka.producer();

const produceMessage = async () => {
  await producer.connect();
  await producer.send({
    topic: 'test-topic',
    messages: [
      { value: 'Hello Kafka from Producer!' }
    ]
  });
  await producer.disconnect();
};

// Run producer
produceMessage()
  .catch(error => console.error(error));
