export {removeEmpty}

/**
 * Accepts an array and removes all undefined values (using `filter`)
 *
 * @example
 * // Primary use case is in `plugins` where `undefined` values can cause issues
 * module.exports = {
 *   ... your config
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
 * @param  {Array} array The array to remove undefined values from
 * @return {Array} The resulting array
 */
function removeEmpty(array) {
  return array.filter(item => typeof item !== 'undefined')
}
