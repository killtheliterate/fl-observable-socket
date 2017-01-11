[![Build Status](https://travis-ci.org/killtheliterate/fl-observable-socket.svg?branch=master)](https://travis-ci.org/killtheliterate/fl-observable-socket)
[![Standard - JavaScript Style Guide](https://img.shields.io/badge/code%20style-standard-brightgreen.svg)](http://standardjs.com/)
[![npm version](https://badge.fury.io/js/fl-observable-socket.svg)](https://badge.fury.io/js/fl-observable-socket)

# fantasy-land observable-socket

Like [observable-socket](https://github.com/killtheliterate/observable-socket)
with more algebra. Works with [ws](https://github.com/websockets/ws) and
[window.WebSocket](https://developer.mozilla.org/en-US/docs/Web/API/WebSocket). 

## Install:

```shell
npm i observable-socket -S
```

## Use:

```javascript
var ws = require('ws')
var flos = require('fl-observable-socket')

// Wrap a WebSocket
var socket = flos(ws('wss://echo.websocket.org'))

// Send messages up the socket
socket.up('hello')
    .fork(e => console.error(e), a => console.log(a))

// Receive messages down the socket
socket.down
    .observe(msg => console.log(msg))
    .then(() => console.log('done'))
    .catch(err => console.error(err))
```

```html
<script type="text/javascript" src="https://unpkg.com/fluture@4.3.0"></script>
<script type="text/javascript" src="https://unpkg.com/most@1.1.1/dist/most"></script>
<script type="text/javascript" src="https://unpkg.com/@most/create@2.0.1"></script>
<script type="text/javascript" src="https://unpkg.com/fl-observable-socket@1.0.0-rc2/dist/index.js"></script>

<script>
    var socket = FLObservableSocket(new WebSocket('wss://echo.websocket.org'))

    // Send messages up the socket
    socket.up('hello')
        .fork(e => console.error(e), a => console.log(a))

    // Receive messages down the socket
    socket.down
        .observe(msg => console.log(msg))
        .then(() => console.log('done'))
        .catch(err => console.error(err))
</script>

```

## API:

`up`: A [`Future`](https://github.com/Avaq/Fluture)
`down`: A [`Stream`](https://github.com/cujojs/most)
