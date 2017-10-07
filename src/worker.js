const mqtt = require('mqtt');

//'mqtt://test.mosquitto.org'

function worker(options) {
  const client = mqtt.connect('mqtt://test.mosquitto.org');

  client.on('connect', () => {
    client.subscribe('presence');
    client.publish('presence', 'Hello mqtt');
  });

  client.on('message', (topic, message) => {
    console.log(message.toString());

    const inserts = [];

    const date = '123456';
    const amount = 1234.56;
    const type = '/some/path';

    const key = `${type}/${date.padStart(10, '0')}`;
    inserts.push({ type: 'put', key, value: amount });

    leveldb.batch(inserts, err => {
      if (err) {
        console.log(err);
      }
    });

    //client.end();
  });
}
