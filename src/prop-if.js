export {propIf, propIfNot}

/**
 * A simple ternary in the form of a function. The `add` argument is evaluated via JSON.parse
 * (to turn "true" to `true`). And if the result is truthy, then `value` will be returned, otherwise `alternate` will be
 * returned. This powers the (arguably more useful) methods returned from `getIfUtils`.
 * @example
 * propIf(true, 'value', 'alternate')
 * // returns 'value'
 * @example
 * // Is falsy sensitive
 * propIf(0, 'value', 'alternate')
 * // returns 'alternate'
 * @param {*} add The value to evaluate
 * @param {*} value The value to return in a truthy case
 * @param {*} alternate The value to return in a falsy case
 * @return {*} The value based on whether `add` evaluates to truthy
 */
function propIf(add, value, alternate) {
  return getValue(add) ? value : alternate
}

/**
 * This does the opposite of `propIf`. In fact, it just calls into it and swaps the `value` and `alternate` arguments
 * 😄
 * @param {*} add The value to evaluate
 * @param {*} value The value to return in a falsy case
 * @param {*} alternate The value to return in a truthy case
 * @return {*} The value based on whether `add` evaluates to truthy
 */
function propIfNot(add, value, alternate) {
  return propIf(add, alternate, value)
}

/**
 * Parses the value as JSON. This way "true" evaluates to true and "23" evaluates to 23
 * @private
 * @param {*} val The value to parse
 * @return {*} the parsed value
 */
function getValue(val) {
  return JSON.parse(val)
}
