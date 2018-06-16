
# mqtt-timeseries-leveldb

writes mqtt timeseries messages into leveldb

# API

<!-- Generated by documentation.js. Update this documentation by updating the source code. -->

### Table of Contents

-   [worker](#worker)
    -   [Parameters](#parameters)

## worker

Sets up a mqtt client to listen for topics

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
