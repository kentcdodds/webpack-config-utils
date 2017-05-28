export {removeEmpty}

/**
 * Accepts an array or an object. In the case of an array, remove all undefined values (using `filter`).
 * In the case of an object, remove all keys whose values are undefined.
 *
 * @example
 * // Primary use case is in `plugins` and `entry` where `undefined` values can cause issues
 * module.exports = {
 *   ... your config
 *   entry: removeEmpty({
 *     app: ifProduction('./indexWithoutCSS', './indexWithCSS'),
 *     css: ifNotProduction('./style.css')
 *   }),
 *   plugins: removeEmpty([
 *     ifProduction(new webpack.optimize.DedupePlugin()),
 *     ifProduction(new webpack.LoaderOptionsPlugin({
 *       minimize: true,
 *       quiet: true,
 *     })),
 *     ifProduction(new webpack.DefinePlugin({
 *       'process.env': {
 *         NODE_ENV: '"production"',
 *       },
 *     })),
 *     ifProduction(new webpack.optimize.UglifyJsPlugin({
 *       compress: {
 *         screw_ie8: true,
 *         warnings: false,
 *       },
 *     })),
 *     new HtmlWebpackPlugin({
 *       template: './index.html',
 *       inject: 'head',
 *     }),
 *     ifProduction(new OfflinePlugin()),
 *   ]),
 * }
 *
 * @param {object | Array} input The object to remove keys from or the array to remove values from
 * @returns {object | Array} The resulting object or array.
 */

function removeEmpty(input) {
  let output
  if (Array.isArray(input)) {
    output = input.filter(item => typeof item !== 'undefined')
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
