import test from 'ava'
import {removeEmptyProperties} from './remove-empty-properties'

test('removeEmptyProperties should remove keys whose values are `undefined` out of an object', t => {
  t.deepEqual(
    removeEmptyProperties({a: 1, b: 'b', c: undefined, d: null}),
    {a: 1, b: 'b', d: null}
  )
})

test('removeEmptyProperties should remove `undefined` values from array', t => {
  t.deepEqual(
    removeEmptyProperties([1, 'b', undefined, null]),
    [1, 'b', null]
  )
})
