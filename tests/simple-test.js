import test from 'ava';
import { worker } from '../src/worker';

const levelup = require('levelup');
const path = require('path');
const mqtt = require('mqtt');

const MQTT_BROKER_URL = 'mqtt://test.mosquitto.org';
const PATH_1 = 'mqtt-timeseries-leveldb/test1';

test.cb('write', t => {
  const values = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13];
  const dates = [];

  t.plan(1);

  const leveldb = levelup(path.join(__dirname, '../build', 'leveldb'));

  worker(leveldb, [PATH_1], { url: MQTT_BROKER_URL });

  const client = mqtt.connect(MQTT_BROKER_URL);

  client.on('connect', () => {
    let count = 0;

    let d = new Date();
    dates.push(d);

    client.publish(PATH_1, JSON.stringify({ date: d, value: values[count++] }));
    setTimeout(() => {
      let d = new Date();
      dates.push(d.getTime());
      client.publish(
        PATH_1,
        JSON.stringify({ date: d, value: values[count++] })
      );
    }, 300);
  });

  let matches = 0;

  setTimeout(() => {
    const readStream = leveldb.createReadStream({
      start: `${PATH_1}/0`,
      end: `${PATH_1}/Z`
    });

    readStream.on('data', data => {
      //console.log(data.key + ' = ' + data.value);
      const date = parseInt(data.key.substring(PATH_1.length + 1), 10);

      const i = dates.indexOf(date);

      if (i >= 0) {
        console.log(`${date} -> ${i}`);

        t.is(parseInt(data.value, 10), values[i]);

        if (data.value == values[i]) {
          console.log(`${date} <> ${values[i]}`);

          if (++matches === 2) {
            t.pass();
          }
        }
      }
    });

    readStream.on('end', () => {
      leveldb.close();
      t.end();
    });
  }, 4000);
});
