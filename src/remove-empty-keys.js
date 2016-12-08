export {
  removeEmptyKeys,
}
/**
 * Accepts an object and removes all keys whose values are undefined.
 * @example
 * // Use case: move CSS into separate file for production (with `extract-text-webpack-plugin`)
 * // but not in development:
 * {
 *  // other webpack configs
 *  entry: removeEmptyKeys({
 *    app: ifProd('./indexWithoutCSS', './indexWithCSS'),
 *    css: ifNotProd('./style.css')
 *  })
 * {
 * @param {object} object The object to remove keys from
 * @returns {object} The resulting object
 */
function removeEmptyKeys(object) {
  const output = {}
  Object.keys(object).forEach(key => {
    const value = object[key]
    if (typeof value !== 'undefined') {
      output[key] = value
    }
  })
  return output
}
