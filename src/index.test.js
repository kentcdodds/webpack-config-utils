import test from 'ava'
import {difference} from 'lodash'
import * as utils from './'

test('exports all the things we care about', t => {
  const allExports = Object.keys(utils)
  const expectedExports = [
    'combineLoaders',
    'propIf', 'propIfNot',
    'removeEmpty', 'getIfUtils',
    'removeEmptyProperties',
  ]
  const diff = difference(allExports, expectedExports)
  t.deepEqual(diff, [])
})
