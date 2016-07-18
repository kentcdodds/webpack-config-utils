import test from 'ava'
import {difference} from 'lodash'
import {getIfUtils} from './get-if-utils'

test('has if and ifNot methods for the expected environment values', t => {
  const expectedMethods = [
    'ifProduction', 'ifNotProduction',
    'ifProd', 'ifNotProd',
    'ifTest', 'ifNotTest',
    'ifDevelopment', 'ifNotDevelopment',
    'ifDev', 'ifNotDev',
  ]
  const utils = getIfUtils({})
  const methods = Object.keys(utils)
  const diff = difference(methods, expectedMethods)
  t.deepEqual(diff, [])
})

test('works with string values', t => {
  const {ifProduction} = getIfUtils('production')
  t.is(ifProduction('value', 'alternate'), 'value')
})

test('works with an env object', t => {
  const {ifNotDev} = getIfUtils({dev: false})
  t.is(ifNotDev('value', 'alternate'), 'value')
})

test('throws an error when given something other than a string or object', t => {
  t.throws(() => getIfUtils(false), /webpack-config-utils:getIfUtils.*?string\/Object/)
})

test('returns true/false when given no arguments', t => {
  const {ifTest, ifProd, ifNotDev} = getIfUtils('test')
  t.is(ifTest(), true)
  t.is(ifProd(), false)
  t.is(ifNotDev(), true)
})
