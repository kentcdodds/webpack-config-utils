import test from 'ava'
import {removeEmptyProperties} from './remove-empty-properties'

test('removeEmptyProperties should remove keys whose values are `undefined` out of an object', t => {
  t.deepEqual(
    removeEmptyProperties({a: 1, b: 'b', c: undefined, d: null}),
    {a: 1, b: 'b', d: null}
  )
})
