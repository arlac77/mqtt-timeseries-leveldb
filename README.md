[![npm](https://img.shields.io/npm/v/mqtt-timeseries-leveldb.svg)](https://www.npmjs.com/package/mqtt-timeseries-leveldb)
[![License](https://img.shields.io/badge/License-0BSD-blue.svg)](https://spdx.org/licenses/0BSD.html)
[![bundlejs](https://deno.bundlejs.com/?q=mqtt-timeseries-leveldb\&badge=detailed)](https://bundlejs.com/?q=mqtt-timeseries-leveldb)
[![downloads](http://img.shields.io/npm/dm/mqtt-timeseries-leveldb.svg?style=flat-square)](https://npmjs.org/package/mqtt-timeseries-leveldb)
[![GitHub Issues](https://img.shields.io/github/issues/arlac77/mqtt-timeseries-leveldb.svg?style=flat-square)](https://github.com/arlac77/mqtt-timeseries-leveldb/issues)
[![Build Status](https://img.shields.io/endpoint.svg?url=https%3A%2F%2Factions-badge.atrox.dev%2Farlac77%2Fmqtt-timeseries-leveldb%2Fbadge\&style=flat)](https://actions-badge.atrox.dev/arlac77/mqtt-timeseries-leveldb/goto)
[![Styled with prettier](https://img.shields.io/badge/styled_with-prettier-ff69b4.svg)](https://github.com/prettier/prettier)
[![Commitizen friendly](https://img.shields.io/badge/commitizen-friendly-brightgreen.svg)](http://commitizen.github.io/cz-cli/)
[![Known Vulnerabilities](https://snyk.io/test/github/arlac77/mqtt-timeseries-leveldb/badge.svg)](https://snyk.io/test/github/arlac77/mqtt-timeseries-leveldb)
[![Coverage Status](https://coveralls.io/repos/arlac77/mqtt-timeseries-leveldb/badge.svg)](https://coveralls.io/github/arlac77/mqtt-timeseries-leveldb)

# mqtt-timeseries-leveldb

writes mqtt timeseries messages into leveldb

# API

<!-- Generated by documentation.js. Update this documentation by updating the source code. -->

### Table of Contents

*   [worker](#worker)
    *   [Parameters](#parameters)

## worker

Sets up a mqtt client to listen for topics
Entries are constructed in the following way: <topic>/<time> : <value>

*   topic one of the given paths
*   time value of Date.getTime()

### Parameters

*   `leveldb` **Levelup** where to put the values
*   `paths` **[Array](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Array)<[string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)>** subscriptions to listen for
*   `options` **[Object](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object)** passed to mqtt.connect

    *   `options.url` **[string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)** mqtt connection url

Returns **Client** mqtt client

# install

With [npm](http://npmjs.org) do:

```shell
npm install mqtt-timeseries-leveldb
```

# license

BSD-2-Clause
