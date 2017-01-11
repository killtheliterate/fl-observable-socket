import EventEmitter from 'events'
import { expect } from 'chai'

import create from '../../dist/index'

const sum = (acc, el) => acc + el
const noop = () => null

describe('down', function () {
  it('observes messages', function (done) {
    const ws = new EventEmitter()
    const socket = create(ws)

    socket.down.take(1)
      .observe(el => expect(el).to.equal(1))
      .catch(done)

    socket.down
      .reduce(sum, 0)
      .then(function (el) {
        expect(el).to.equal(6)
        done()
      })
      .catch(done)

    ws.emit('message', [1])
    ws.emit('message', [2])
    ws.emit('message', [3])
    ws.emit('close')
  })

  it('completes with then', function (done) {
    const ws = new EventEmitter()
    const socket = create(ws)

    socket.down
      .observe(noop)
      .then(function () {
        done()
      })
      .catch(done)

    ws.emit('close')
  })

  it('wraps errors', function (done) {
    const ws = new EventEmitter()
    const socket = create(ws)

    socket.down
      .observe(noop)
      .catch(function (err) {
        expect(err.message).to.equal('you done messed up')
        done()
      })

    ws.emit('error', new Error('you done messed up'))
  })
})
