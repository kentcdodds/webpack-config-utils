import test from 'ava'
import {removeEmpty} from './remove-empty'

test('removeEmpty should remove undefined values out of an array', t => {
  t.deepEqual(removeEmpty([undefined, 0, 1, 2, undefined, 3, undefined, null]), [0, 1, 2, 3, null])
})

test('removeEmpty should remove keys whose values are `undefined` out of an object', t => {
  t.deepEqual(
    removeEmpty({a: 1, b: 'b', c: undefined, d: null}),
    {a: 1, b: 'b', d: null}
  )
})
