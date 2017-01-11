import create from '../../dist/index'
import EventEmitter from 'events'

describe('down', function () {
    it('gets messages', function (done) {
      const ws = new EventEmitter()

      ws.readyState = 1

      const mathSocket = create(ws)

      mathSocket.down
        .observe()
        .then(done)
        .catch(done)

      ws.emit('close')
    })
})
