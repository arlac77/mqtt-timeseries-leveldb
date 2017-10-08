import test from 'ava';
import { worker } from '../src/worker';

const levelup = require('levelup');
const path = require('path');
const mqtt = require('mqtt');

const MQTT_BROKER_URL = 'mqtt://test.mosquitto.org';
const PATH_1 = 'mqtt-timeseries-leveldb/test1';

test.cb('write', t => {
  const values = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];
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
      dates.push(d);
      client.publish(
        PATH_1,
        JSON.stringify({ date: d, value: values[count++] })
      );
    }, 500);
  });

  setTimeout(() => {
    const readStream = leveldb.createReadStream({
      start: `${PATH_1}/0`,
      end: `${PATH_1}/Z`
    });

    readStream.on('data', data => {
      //console.log(data.key + ' = ' + data.value);
      const t = parseInt(data.key.substring(PATH_1.length + 1), 10);
      //console.log(t);
      const date = new Date(t);
      console.log(`${date} <> ${dates[0]} ${data.value} <> ${values[0]}`);
      if (date == dates[0] && data.value == values[0]) {
        t.pass();
      }
    });

    readStream.on('end', () => {
      leveldb.close();
      t.end();
    });
  }, 3000);
});
