import { create } from '@most/create'
import { fromEvent } from 'most'
import { has, head } from 'ramda'

import { Future } from 'fluture/es5'

const fromMessage = _ws => has('WebSocket', global)
  ? fromEvent('message', _ws).map(msg => msg.data)
  : fromEvent('message', _ws).map(msg => head(msg))

function FLSocket (_ws) {
  const _open = fromEvent('open', _ws)
  const _close = fromEvent('close', _ws)
  const _error = fromEvent('error', _ws)
  const _messages = fromMessage(_ws)

  const ready = () => _ws.readyState === 1

  const send = msg => Future(function (reject, resolve) {
    try {
      _ws.send(msg)
      resolve('success')
    } catch (e) {
      reject(e)
    }
  })

  const readyToSend = msg => Future(function (reject, resolve) {
    ready()
     ? resolve(msg)
     : _open.take(1).observe(() => resolve(msg))
  })

  return {
    up: message => readyToSend(message).chain(send),

    down: create((add, end, error) => {
      _close.observe(end)
      _error.observe(error)
      _messages.observe(add)
    })
  }
}

export default FLSocket
