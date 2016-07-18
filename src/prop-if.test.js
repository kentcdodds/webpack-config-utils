import test from 'ava'
import {propIf, propIfNot} from './prop-if'

test('propIf should use the given value when true', t => {
  t.is(propIf(true, 'value', 'alternate'), 'value')
})

test('propIf should use the alternate when false', t => {
  t.is(propIf(false, 'value', 'alternate'), 'alternate')
})

test('propIf should parse a string of "false" as `false`', t => {
  t.is(propIf('false', 'value', 'alternate'), 'alternate')
})

test('propIfNot should use the given alternate when true', t => {
  t.is(propIfNot(true, 'value', 'alternate'), 'alternate')
})

test('propIfNot should use the value when false', t => {
  t.is(propIfNot(false, 'value', 'alternate'), 'value')
})

test('propIfNot should parse a string of "false" as `false`', t => {
  t.is(propIfNot('false', 'value', 'alternate'), 'value')
})
