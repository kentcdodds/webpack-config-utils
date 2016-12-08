import test from 'ava'
import {removeEmptyKeys} from './remove-empty-keys'

test('removeEmptyKeys should remove keys whose values are `undefined` out of an object', t => {
  t.deepEqual(
    removeEmptyKeys({a: 1, b: 'b', c: undefined, d: null}),
    {a: 1, b: 'b', d: null}
  )
})
