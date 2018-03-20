import test from 'ava';
import { worker } from '../src/worker';

const levelup = require('levelup');
const leveldown = require('leveldown');
const path = require('path');
const mqtt = require('mqtt');

const MQTT_BROKER_URL = 'mqtt://test.mosquitto.org';
const PATH_1 = 'mqtt-timeseries-leveldb/test1';

test.cb('write', t => {
  const values = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13];

  t.plan(values.length);

  const leveldb = levelup(
    leveldown(path.join(__dirname, '..', 'build', 'leveldb'))
  );

  worker(leveldb, [PATH_1], { url: MQTT_BROKER_URL }).then(() => {
    const dates = [];

    let matches = 0;

    const client = mqtt.connect(MQTT_BROKER_URL);

    client.on('connect', () => {
      let count = 0;

      let iv = setInterval(() => {
        const d = new Date();
        dates.push(d.getTime());
        client.publish(
          PATH_1,
          JSON.stringify({ date: d, value: values[count] }),
          err => {
            count++;
          }
        );

        if (count === values.length) {
          clearInterval(iv);
          const readStream = leveldb.createReadStream({
            start: `${PATH_1}/0`,
            end: `${PATH_1}/Z`
          });

          readStream.on('data', data => {
            const date = parseInt(
              data.key.toString().substring(PATH_1.length + 1),
              10
            );

            const i = dates.indexOf(date);

            if (i >= 0) {
              t.is(parseInt(data.value.toString(), 10), values[i]);

              if (parseInt(data.value.toString(), 10) == values[i]) {
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
        }
      }, 50);
    });
  });
});
