import connect from "mqtt/lib/connect/index.js";

/**
 * Sets up a mqtt client to listen for topics
 * Entries are constructed in the following way:
 * <topic>/<time> : <value>
 * - topic one of the given paths
 * - time value of Date.getTime()
 * @param {Levelup} leveldb where to put the values
 * @param {string[]} paths subscriptions to listen for
 * @param {Object} options passed to mqtt.connect
 * @param {string} options.url mqtt connection url
 * @return {Client} mqtt client
 */
export async function worker(leveldb, paths, options) {
  const client = connect(
    options.url,
    options
  );

  return new Promise((resolve, reject) => {
    client.on("connect", () => {
      paths.forEach(p => client.subscribe(p));
      resolve(client);
    });

    client.on("error", error => reject(error));

    client.on("message", (topic, message) => {
      const data = JSON.parse(message.toString());
      const date = new Date(data.date);
      const key = `${topic}/${date.getTime() /*.padStart(10, '0')*/}`;
      const value = data.value;

      // console.log(`write ${key} = ${value}`);

      leveldb.put(key, value, err => {
        if (err) {
          // TODO what to do with the errors
          //reject(err);
        }
      });
    });
  });
}
