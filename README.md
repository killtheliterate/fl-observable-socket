[![Build Status](https://travis-ci.org/killtheliterate/fl-observable-socket.svg?branch=master)](https://travis-ci.org/killtheliterate/fl-observable-socket)
[![Standard - JavaScript Style Guide](https://img.shields.io/badge/code%20style-standard-brightgreen.svg)](http://standardjs.com/)

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

## API:

`up`: A [`Future`](https://github.com/Avaq/Fluture)
`down`: A [`Stream`](https://github.com/cujojs/most)
