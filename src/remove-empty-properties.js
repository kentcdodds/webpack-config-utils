import {
  removeEmpty,
} from './remove-empty'

export {
  removeEmptyProperties,
}

/**
 * Accepts an object or an array. If an object, remove all keys whose values are undefined.
 * If an array, remove all undefined values.
 * @example
 * // Use case: move CSS into separate file for production (with `extract-text-webpack-plugin`)
 * // but not in development:
 * {
 *  // other webpack configs
 *  entry: removeEmptyProperties({
 *    app: ifProd('./indexWithoutCSS', './indexWithCSS'),
 *    css: ifNotProd('./style.css')
 *  })
 * }
 *
 * In the case of array input, see the documentation for `removeEmpty`.
 *
 * @param {object | Array} input The object to remove keys from
 * @returns {object} The resulting object
 */
function removeEmptyProperties(input) {
  let output
  if (Array.isArray(input)) {
    output = removeEmpty(input)
  } else {
    output = {}
    Object.keys(input).forEach(key => {
      const value = input[key]
      if (typeof value !== 'undefined') {
        output[key] = value
      }
    })
  }
  return output
}
