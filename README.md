# webpack-config-utils

Utilities to help your webpack config be easier to read

[![Build Status][build-badge]][build]
[![Code Coverage][coverage-badge]][coverage]
[![Dependencies][dependencyci-badge]][dependencyci]
[![version][version-badge]][package]
[![downloads][downloads-badge]][npm-stat]
[![MIT License][license-badge]][LICENSE]

[![All Contributors](https://img.shields.io/badge/all_contributors-8-orange.svg?style=flat-square)](#contributors)
[![PRs Welcome][prs-badge]][prs]
[![Donate][donate-badge]][donate]
[![Code of Conduct][coc-badge]][coc]
[![Roadmap][roadmap-badge]][roadmap]
[![Examples][examples-badge]][examples]

## The problem

Webpack configuration is a JavaScript object which is awesomely declarative. However, often the webpack config file is
can easily turn into an imperative mess in the process of creating the configuration object.

## This solution

The goal of this project is to provide utilities to make it easier to compose your config object so it's easier for
people to read. It has some custom methods and also comes bundled with some other projects to expose some helpful
utility functions.

## Installation

This module is distributed via [npm][npm] which is bundled with [node][node] and should
be installed as one of your project's `devDependencies`:

```
npm install --save-dev webpack-config-utils
```

## Usage

It is expected that you use this in your `webpack.config.js` file.

> Protip: You can name your config file `webpack.config.babel.js` and
> it'll be automagically transpiled! (Make sure you have
> `babel-register` installed.) So you could use ES6 module imports
> rather than CommonJS requires. But this example will stick to
> CommonJS because we love you ❤️

```javascript
const webpack = require('webpack')
const {getIfUtils, removeEmpty} = require('webpack-config-utils')

const {ifProduction, ifNotProduction} = getIfUtils(process.env.NODE_ENV)

module.exports = {
  // ... your config
  mode: ifProduction('production', 'development'),
  entry: removeEmpty({
     app: ifProduction('./indexWithoutCSS', './indexWithCSS'),
     css: ifProduction('./style.scss')
  }),
  output: {
    chunkFilename: ifProduction('js/[id].[contenthash].js', 'js/[name].js'),
    filename: ifProduction('js/[id].[contenthash].js', 'js/[name].js'),
  },
  module: {
    rules: [
      {
        test: /\.(sc|c)ss$/,
        exclude: /node_modules/,
        use: removeEmpty([
          ifProduction(MiniCssExtractPlugin.loader),
          ifNotProduction({loader: 'style-loader', options: {sourceMap: true}}),
          {loader: 'css-loader', options: {sourceMap: true}},
          {loader: 'postcss-loader', options: {sourceMap: true}},
          {loader: 'sass-loader', options: {sourceMap: true}},
        ]),
      },
  },
  plugins: removeEmpty([
    ifProduction(
      new MiniCssExtractPlugin({
        filename: 'css/[id].[contenthash].css',
      })
    ),
    ifProduction(new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: '"production"',
      },
    })),
    new HtmlWebpackPlugin({
      template: './index.html',
      inject: 'head',
    }),
    ifProduction(new OfflinePlugin()),
  ]),
}
```

Then you'd invoke the webpack config with [`cross-env`][cross-env] in your `package.json` scripts (or with
[`nps`][nps]):

```js
{
  // your package.json stuff
  scripts: {
    "build:dev": "cross-env NODE_ENV=development webpack",
    "build:prod": "cross-env NODE_ENV=production webpack"
  }
}
```

---

Things get even better with webpack 2+ because you can write your webpack config as a function that accepts an `env`
argument which you can set on the command line (which means you don't need `cross-env` 👍).

```javascript
const webpack = require('webpack')
const {resolve} = require('path')
const {getIfUtils} = require('webpack-config-utils')

module.exports = env => {
  const {ifDev} = getIfUtils(env)
  return {
    output: {
      // etc.
      pathinfo: ifDev(),
      path: resolve(__dirname, 'dist'),
    },
    // etc.
  }
}
```

## API

See the API Documentation [here][API Docs]. In addition to custom utilities from this package, it comes bundled with
a few another helpful utility: [`webpack-combine-loaders`](https://www.npmjs.com/package/webpack-combine-loaders) (exposed as `combineLoaders`).

## Articles

* [One webpack config to rule them all — environments that is](https://medium.com/@ryandrewjohnson/one-webpack-config-to-rule-them-all-environments-that-is-277457769779#.34laieb5i)

## Contributors

Thanks goes to these people ([emoji key][emojis]):

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
| [<img src="https://avatars.githubusercontent.com/u/1500684?v=3" width="100px;"/><br /><sub>Kent C. Dodds</sub>](https://kentcdodds.com)<br />[💻](https://github.com/kentcdodds/webpack-config-utils/commits?author=kentcdodds) [📖](https://github.com/kentcdodds/webpack-config-utils/commits?author=kentcdodds) 💡 🚇 [⚠️](https://github.com/kentcdodds/webpack-config-utils/commits?author=kentcdodds) | [<img src="https://avatars.githubusercontent.com/u/284515?v=3" width="100px;"/><br /><sub>Breno Calazans</sub>](https://twitter.com/breno_calazans)<br />💡 | [<img src="https://avatars.githubusercontent.com/u/363583?v=3" width="100px;"/><br /><sub>Tamara Temple</sub>](http://tamouse.org)<br />[📖](https://github.com/kentcdodds/webpack-config-utils/commits?author=tamouse) | [<img src="https://avatars.githubusercontent.com/u/7907232?v=3" width="100px;"/><br /><sub>Ben Halverson</sub>](benhalverson.me)<br />[📖](https://github.com/kentcdodds/webpack-config-utils/commits?author=benhalverson) | [<img src="https://avatars.githubusercontent.com/u/7352279?v=3" width="100px;"/><br /><sub>Huy Nguyen</sub>](http://www.huy-nguyen.com/)<br />[💻](https://github.com/kentcdodds/webpack-config-utils/commits?author=huy-nguyen) [📖](https://github.com/kentcdodds/webpack-config-utils/commits?author=huy-nguyen) 💡 [⚠️](https://github.com/kentcdodds/webpack-config-utils/commits?author=huy-nguyen) | [<img src="https://avatars.githubusercontent.com/u/3419547?v=3" width="100px;"/><br /><sub>Ryan Johnson</sub>](https://github.com/ryandrewjohnson)<br />📝 [📖](https://github.com/kentcdodds/webpack-config-utils/commits?author=ryandrewjohnson) | [<img src="https://avatars1.githubusercontent.com/u/97462?v=3" width="100px;"/><br /><sub>Adam DiCarlo</sub>](http://adamdicarlo.com)<br />[📖](https://github.com/kentcdodds/webpack-config-utils/commits?author=adamdicarlo) 🔧 |
| :---: | :---: | :---: | :---: | :---: | :---: | :---: |
| [<img src="https://avatars2.githubusercontent.com/u/5779101?v=4" width="100px;"/><br /><sub>Jeremy Y</sub>](https://github.com/jezzay)<br />[📖](https://github.com/kentcdodds/webpack-config-utils/commits?author=jezzay) |
<!-- ALL-CONTRIBUTORS-LIST:END -->

This project follows the [all-contributors][all-contributors] specification. Contributions of any kind welcome!

## LICENSE

MIT

[npm]: https://www.npmjs.com/
[node]: https://nodejs.org
[build-badge]: https://img.shields.io/travis/kentcdodds/webpack-config-utils.svg?style=flat-square
[build]: https://travis-ci.org/kentcdodds/webpack-config-utils
[coverage-badge]: https://img.shields.io/codecov/c/github/kentcdodds/webpack-config-utils.svg?style=flat-square
[coverage]: https://codecov.io/github/kentcdodds/webpack-config-utils
[dependencyci-badge]: https://dependencyci.com/github/kentcdodds/webpack-config-utils/badge?style=flat-square
[dependencyci]: https://dependencyci.com/github/kentcdodds/webpack-config-utils
[version-badge]: https://img.shields.io/npm/v/webpack-config-utils.svg?style=flat-square
[package]: https://www.npmjs.com/package/webpack-config-utils
[downloads-badge]: https://img.shields.io/npm/dm/webpack-config-utils.svg?style=flat-square
[npm-stat]: http://npm-stat.com/charts.html?package=webpack-config-utils&from=2016-04-01
[license-badge]: https://img.shields.io/npm/l/webpack-config-utils.svg?style=flat-square
[license]: https://github.com/kentcdodds/webpack-config-utils/blob/master/other/LICENSE
[prs-badge]: https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat-square
[prs]: http://makeapullrequest.com
[donate-badge]: https://img.shields.io/badge/$-support-green.svg?style=flat-square
[donate]: http://kcd.im/donate
[coc-badge]: https://img.shields.io/badge/code%20of-conduct-ff69b4.svg?style=flat-square
[coc]: https://github.com/kentcdodds/webpack-config-utils/blob/master/other/CODE_OF_CONDUCT.md
[roadmap-badge]: https://img.shields.io/badge/%F0%9F%93%94-roadmap-CD9523.svg?style=flat-square
[roadmap]: https://github.com/kentcdodds/webpack-config-utils/blob/master/other/ROADMAP.md
[examples-badge]: https://img.shields.io/badge/%F0%9F%92%A1-examples-8C8E93.svg?style=flat-square
[examples]: https://github.com/kentcdodds/webpack-config-utils/blob/master/other/EXAMPLES.md
[emojis]: https://github.com/kentcdodds/all-contributors#emoji-key
[all-contributors]: https://github.com/kentcdodds/all-contributors
[cross-env]: https://www.npmjs.com/package/cross-env
[nps]: https://www.npmjs.com/package/nps
[API Docs]: https://doclets.io/kentcdodds/webpack-config-utils/master
