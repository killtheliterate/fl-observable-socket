import create from '../../dist/index'
import EventEmitter from 'events'

function send (socket, msg) {
  return socket.up(msg)
}

function noop () {
  return null
}

describe('up', function () {
    it('sends messages', function (done) {
      const ws = new EventEmitter()

      ws.readyState = 1
      let sendCount = 0
      ws.send = function () {
        if (sendCount < 2) {
          sendCount += 1
        } else {
          throw new Error('Socket error')
        }
      }

      const mathSocket = create(ws)

      const send = (socket, msg) => socket
        .up(msg)
        .fork(done, noop)

      send(mathSocket, 1).fork(done, noop)
      send(mathSocket, 2).fork(done, noop)
      send(mathSocket, 3).fork(done, noop)
    })

  it('err', function (done) {
      const ws = new EventEmitter()
      ws.readyState = 1

      let sendCount = 0

      ws.send = function (msg) {
        if (sendCount < 2) {
          sendCount += 1
        } else {
          throw new Error('Socket error')
        }
      }

      const mathSocket = create(ws)

      mathSocket.up('hello')
      mathSocket.up('world')
      mathSocket.up('no, you hey')
    done()
  })
})
