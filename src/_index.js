import { Future } from 'fluture/es5'
import { create } from '@most/create'
import { fromEvent, merge } from 'most'

function FLObservableSocket (_ws) {
  const _open = fromEvent('open', _ws)
  const _close = fromEvent('close', _ws)
  const _error = fromEvent('error', _ws)
  const _messages = fromEvent('message', _ws)

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
      const done = merge(_close.tap(end), _error.tap(error)).take(1)

      _messages.until(done).observe(add)
    })
  }
}

export default FLObservableSocket
