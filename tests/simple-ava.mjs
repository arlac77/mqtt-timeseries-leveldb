import test from "ava";
import { worker } from "../src/worker.mjs";
import connect from "mqtt/lib/connect/index.js";

import levelup from "levelup";
import leveldown from "leveldown";
import { join } from "path";
import { mkdirSync } from "fs";

const MQTT_BROKER_URL = "mqtt://test.mosquitto.org";
const PATH_1 = "mqtt-timeseries-leveldb/test1";

test.cb("write + read", t => {
  const values = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13];

  let planned = values.length - 1;
  t.plan(planned);

  const dir = "build";
  try {
    mkdirSync(dir);
  } catch {}

  const leveldb = levelup(leveldown(join(dir, "leveldb")));

  worker(leveldb, [PATH_1], { url: MQTT_BROKER_URL }).then(() => {
    const dates = [];

    const client = connect(MQTT_BROKER_URL);

    client.on("connect", () => {
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
          console.log("D");

          clearInterval(iv);
          const readStream = leveldb.createReadStream({
            start: `${PATH_1}/0`,
            end: `${PATH_1}/Z`
          });

          readStream.on("data", data => {
            console.log("E");

            const date = parseInt(
              data.key.toString().substring(PATH_1.length + 1),
              10
            );

            const i = dates.indexOf(date);

            if (i >= 0) {
              t.is(parseInt(data.value.toString(), 10), values[i]);

              if (parseInt(data.value.toString(), 10) == values[i]) {
                console.log(`${date} <> ${values[i]}`);

                planned--;
                if (planned <= 0) {
                  console.log(`planned: ${planned}`);

                  t.end();
                }

                //console.log(`pass ${values.length} ${matches}`);
              }
            }
          });

          readStream.on("end", () => {
            console.log(`end`);
            leveldb.close();
            //t.end();
          });
        }
      }, 500);
    });
  });
});
