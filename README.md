# webpack-config-utils

Utilities to help your webpack config be easier to read

[![Build Status][build-badge]][build]
[![Code Coverage][coverage-badge]][coverage]
[![Dependencies][dependencyci-badge]][dependencyci]
[![version][version-badge]][package]
[![downloads][downloads-badge]][npm-stat]
[![MIT License][license-badge]][LICENSE]

[![All Contributors](https://img.shields.io/badge/all_contributors-10-orange.svg?style=flat-square)](#contributors)
[![PRs Welcome][prs-badge]][prs]
[![Donate][donate-badge]][donate]
[![Code of Conduct][coc-badge]][coc]
[![Roadmap][roadmap-badge]][roadmap]
[![Examples][examples-badge]][examples]

## The problem

Webpack configuration is a JavaScript object which is awesomely declarative. However, the webpack config file
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
<!-- prettier-ignore-start -->
<!-- markdownlint-disable -->
<table>
  <tr>
    <td align="center"><a href="https://kentcdodds.com"><img src="https://avatars.githubusercontent.com/u/1500684?v=3" width="100px;" alt=""/><br /><sub><b>Kent C. Dodds</b></sub></a><br /><a href="https://github.com/kentcdodds/webpack-config-utils/commits?author=kentcdodds" title="Code">💻</a> <a href="https://github.com/kentcdodds/webpack-config-utils/commits?author=kentcdodds" title="Documentation">📖</a> <a href="#example-kentcdodds" title="Examples">💡</a> <a href="#infra-kentcdodds" title="Infrastructure (Hosting, Build-Tools, etc)">🚇</a> <a href="https://github.com/kentcdodds/webpack-config-utils/commits?author=kentcdodds" title="Tests">⚠️</a></td>
    <td align="center"><a href="https://twitter.com/breno_calazans"><img src="https://avatars.githubusercontent.com/u/284515?v=3" width="100px;" alt=""/><br /><sub><b>Breno Calazans</b></sub></a><br /><a href="#example-brenoc" title="Examples">💡</a></td>
    <td align="center"><a href="http://tamouse.org"><img src="https://avatars.githubusercontent.com/u/363583?v=3" width="100px;" alt=""/><br /><sub><b>Tamara Temple</b></sub></a><br /><a href="https://github.com/kentcdodds/webpack-config-utils/commits?author=tamouse" title="Documentation">📖</a></td>
    <td align="center"><a href="benhalverson.me"><img src="https://avatars.githubusercontent.com/u/7907232?v=3" width="100px;" alt=""/><br /><sub><b>Ben Halverson</b></sub></a><br /><a href="https://github.com/kentcdodds/webpack-config-utils/commits?author=benhalverson" title="Documentation">📖</a></td>
    <td align="center"><a href="http://www.huy-nguyen.com/"><img src="https://avatars.githubusercontent.com/u/7352279?v=3" width="100px;" alt=""/><br /><sub><b>Huy Nguyen</b></sub></a><br /><a href="https://github.com/kentcdodds/webpack-config-utils/commits?author=huy-nguyen" title="Code">💻</a> <a href="https://github.com/kentcdodds/webpack-config-utils/commits?author=huy-nguyen" title="Documentation">📖</a> <a href="#example-huy-nguyen" title="Examples">💡</a> <a href="https://github.com/kentcdodds/webpack-config-utils/commits?author=huy-nguyen" title="Tests">⚠️</a></td>
    <td align="center"><a href="https://github.com/ryandrewjohnson"><img src="https://avatars.githubusercontent.com/u/3419547?v=3" width="100px;" alt=""/><br /><sub><b>Ryan Johnson</b></sub></a><br /><a href="#blog-ryandrewjohnson" title="Blogposts">📝</a> <a href="https://github.com/kentcdodds/webpack-config-utils/commits?author=ryandrewjohnson" title="Documentation">📖</a></td>
    <td align="center"><a href="http://adamdicarlo.com"><img src="https://avatars1.githubusercontent.com/u/97462?v=3" width="100px;" alt=""/><br /><sub><b>Adam DiCarlo</b></sub></a><br /><a href="https://github.com/kentcdodds/webpack-config-utils/commits?author=adamdicarlo" title="Documentation">📖</a> <a href="#tool-adamdicarlo" title="Tools">🔧</a></td>
  </tr>
  <tr>
    <td align="center"><a href="https://github.com/jezzay"><img src="https://avatars2.githubusercontent.com/u/5779101?v=4" width="100px;" alt=""/><br /><sub><b>Jeremy Y</b></sub></a><br /><a href="https://github.com/kentcdodds/webpack-config-utils/commits?author=jezzay" title="Documentation">📖</a></td>
    <td align="center"><a href="http://seanyesmunt.com"><img src="https://avatars0.githubusercontent.com/u/16882830?v=4" width="100px;" alt=""/><br /><sub><b>Sean Yesmunt</b></sub></a><br /><a href="https://github.com/kentcdodds/webpack-config-utils/commits?author=seanyesmunt" title="Documentation">📖</a></td>
    <td align="center"><a href="https://stackshare.io/jdorfman/decisions"><img src="https://avatars1.githubusercontent.com/u/398230?v=4" width="100px;" alt=""/><br /><sub><b>Justin Dorfman</b></sub></a><br /><a href="#fundingFinding-jdorfman" title="Funding Finding">🔍</a></td>
    <td align="center"><a href="https://www.andrewm.codes"><img src="https://avatars1.githubusercontent.com/u/18423853?v=4" width="100px;" alt=""/><br /><sub><b>Andrew Mason</b></sub></a><br /><a href="https://github.com/kentcdodds/webpack-config-utils/commits?author=andrewmcodes" title="Documentation">📖</a></td>
  </tr>
</table>

<!-- markdownlint-enable -->
<!-- prettier-ignore-end -->
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
