const mqtt = require('mqtt');

export async function worker(leveldb, paths, options) {
  const client = mqtt.connect(options.url);

  return new Promise((resolve, reject) => {
    client.on('connect', () => {
      paths.forEach(p => client.subscribe(p));
      resolve(client);
    });

    client.on('message', (topic, message) => {
      const data = JSON.parse(message.toString());

      const inserts = [];

      const date = new Date(data.date);
      const amount = data.value;
      const key = `${topic}/${date.getTime() /*.padStart(10, '0')*/}`;

      inserts.push({ type: 'put', key, value: amount });

      leveldb.batch(inserts, err => {
        if (err) {
          console.log(err);
        }
        console.log(key);
      });
    });
  });
}
