import test from 'ava';
import { worker } from '../src/worker';

const levelup = require('levelup');
const path = require('path');

test.cb('write', t => {
  t.plan(1);

  const leveldb = levelup(path.join(__dirname, '../build', 'leveldb'));

  worker(leveldb, { url: 'mqtt://test.mosquitto.org' });

  const readStream = leveldb.createReadStream({ start: 'pv/0', end: 'pv/Z' });

  readStream.on('data', data => {
    //console.log(data.key + ' = ' + data.value);

    if (data.key === 'pv/1030665600' && data.value == 2004.1) {
      t.pass();
    }
  });

  readStream.on('end', () => {
    leveldb.close();
    t.end();
  });
});
