import test from 'ava'
import {removeEmpty} from './remove-empty'

test('removeEmpty should remove undefined values out of an array', t => {
  t.deepEqual(removeEmpty([undefined, 0, 1, 2, undefined, 3, undefined, null]), [0, 1, 2, 3, null])
})
