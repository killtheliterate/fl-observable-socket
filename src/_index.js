import { Future } from 'fluture/es5'
import { create } from '@most/create'
import { fromEvent } from 'most'

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
      const __close = _close.until(_error).take(1)
      const __error = _error.until(_close).take(1)

      __close.observe(end)
      __error.observe(error)
      _messages.until(__close.merge(__error)).observe(add)
    })
  }
}

export default FLObservableSocket
