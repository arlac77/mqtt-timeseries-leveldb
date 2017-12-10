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
      const date = new Date(data.date);
      const key = `${topic}/${date.getTime() /*.padStart(10, '0')*/}`;
      const value = data.value;

      //  console.log(`write ${key} = ${amount}`);

      leveldb.put(key, value, err => {
        if (err) {
          reject(err);
        }
      });
    });
  });
}
