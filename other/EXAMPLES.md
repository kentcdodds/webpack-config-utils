# Examples

## React Hot Loader with `webpack-config-utils`

```js
const path = require('path')
const webpack = require('webpack')
const {getIfUtils, removeEmpty} = require('webpack-config-utils')

const {ifDevelopment, ifProduction} = getIfUtils(process.env.NODE_ENV)

module.exports = {
  devtool: 'eval',
  entry: removeEmpty([
    ...ifDevelopment([
      'webpack-dev-server/client?http://localhost:3000',
      'webpack/hot/only-dev-server',
      'react-hot-loader/patch',
    ]),
    './index'
  ]),
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'bundle.js',
    publicPath: '/static/'
  },
  plugins: removeEmpty([
    new webpack.optimize.OccurrenceOrderPlugin(),
    ...ifDevelopment([
      new webpack.HotModuleReplacementPlugin(),
      new webpack.NoErrorsPlugin(),
    ]),
    ...ifProduction([
      new webpack.DefinePlugin({
        'process.env': {
          'NODE_ENV': '"production"',
        },
      }),
      new webpack.optimize.UglifyJsPlugin({compressor: {warnings: false}}),
    ]),
  ]),
  module: {
    loaders: [{
      test: /\.js$/,
      loaders: ['babel-loader'],
      exclude: /node_modules/,
      include: __dirname
    }, {
      test: /\.js$/,
      loaders: ['babel-loader'],
      include: path.join(__dirname, '..', '..', 'src')
    }, {
      test: /\.css?$/,
      loaders: ['style-loader', 'raw-loader'],
      include: __dirname
    }]
  }
}
```
