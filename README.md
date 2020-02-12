[![GitHub Issues](https://img.shields.io/github/issues/arlac77/mqtt-timeseries-leveldb.svg?style=flat-square)](https://github.com/arlac77/mqtt-timeseries-leveldb/issues)
[![License](https://img.shields.io/badge/License-BSD%203--Clause-blue.svg)](https://opensource.org/licenses/BSD-3-Clause)
[![downloads](http://img.shields.io/npm/dm/mqtt-timeseries-leveldb.svg?style=flat-square)](https://npmjs.org/package/mqtt-timeseries-leveldb)
[![minified size](https://badgen.net/bundlephobia/min/mqtt-timeseries-leveldb)](https://bundlephobia.com/result?p=mqtt-timeseries-leveldb)
[![npm](https://img.shields.io/npm/v/mqtt-timeseries-leveldb.svg)](https://www.npmjs.com/package/mqtt-timeseries-leveldb)
[![Greenkeeper](https://badges.greenkeeper.io/arlac77/mqtt-timeseries-leveldb.svg)](https://greenkeeper.io/)
[![semantic-release](https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg)](https://github.com/arlac77/mqtt-timeseries-leveldb)
[![Build Status](https://secure.travis-ci.org/arlac77/mqtt-timeseries-leveldb.png)](http://travis-ci.org/arlac77/mqtt-timeseries-leveldb)
[![styled with prettier](https://img.shields.io/badge/styled_with-prettier-ff69b4.svg)](https://github.com/prettier/prettier)
[![Commitizen friendly](https://img.shields.io/badge/commitizen-friendly-brightgreen.svg)](http://commitizen.github.io/cz-cli/)
[![Known Vulnerabilities](https://snyk.io/test/github/arlac77/mqtt-timeseries-leveldb/badge.svg)](https://snyk.io/test/github/arlac77/mqtt-timeseries-leveldb)

# mqtt-timeseries-leveldb

writes mqtt timeseries messages into leveldb

# API

<!-- Generated by documentation.js. Update this documentation by updating the source code. -->

### Table of Contents

-   [worker](#worker)
    -   [Parameters](#parameters)

## worker

Sets up a mqtt client to listen for topics
Entries are constructed in the following way:
<topic>/<time> : <value>

-   topic one of the given paths
-   time value of Date.getTime()

### Parameters

-   `leveldb` **Levelup** where to put the values
-   `paths` **[Array](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Array)&lt;[string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)>** subscriptions to listen for
-   `options` **[Object](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object)** passed to mqtt.connect
    -   `options.url` **[string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)** mqtt connection url

Returns **Client** mqtt client

# install

With [npm](http://npmjs.org) do:

```shell
npm install mqtt-timeseries-leveldb
```

# license

BSD-2-Clause
