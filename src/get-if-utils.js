import {propIf, propIfNot} from './prop-if'

export {getIfUtils}

/**
 * The object returned from getIfUtils
 * @typedef {Object} IfUtils
 * @property {function} ifProduction - a wrapper around `propIf` function that returns the given `value` if the
 * environment is `"production"` or the `alternate` if not
 * @property {function} ifNotProduction, - a wrapper around `propIf` function that returns the given `value` if the
 * environment is not `"production"` or the `alternate` if it is
 * @property {function} ifProd - a wrapper around `propIf` function that returns the given `value` if the environment is
 * `"prod"` or the `alternate` if not
 * @property {function} ifNotProd, - a wrapper around `propIf` function that returns the given `value` if the
 * environment is not `"prod"` or the `alternate` if it is
 * @property {function} ifTest - a wrapper around `propIf` function that returns the given `value` if the environment is
 * `"test"` or the `alternate` if not
 * @property {function} ifNotTest, - a wrapper around `propIf` function that returns the given `value` if the
 * environment is not `"test"` or the `alternate` if it is
 * @property {function} ifDevelopment - a wrapper around `propIf` function that returns the given `value` if the
 * environment is `"development"` or the `alternate` if not
 * @property {function} ifNotDevelopment, - a wrapper around `propIf` function that returns the given `value` if the
 * environment is not `"development"` or the `alternate` if it is
 * @property {function} ifDev - a wrapper around `propIf` function that returns the given `value` if the environment is
 * `"dev"` or the `alternate` if not
 * @property {function} ifNotDev, - a wrapper around `propIf` function that returns the given `value` if the
 * environment is not `"dev"` or the `alternate` if it is
 */

/**
 * This returns an object with methods to help you conditionally set values to your webpack configuration object.
 * @param  {Object|string} env This would be either the `env` object from webpack (function config API) or the value of
 * `process.env.NODE_ENV`.
 * @param  {Array} vars A list of valid environments if utils are generated for
 * @return {IfUtils} the IfUtils object for the given environment
 */
function getIfUtils(env, vars = ['production', 'prod', 'test', 'development', 'dev']) {
  env = typeof env === 'string' ? {[env]: true} : env
  if (typeof env !== 'object') {
    throw new Error(
      `webpack-config-utils:getIfUtils: env passed should be a string/Object. Was ${JSON.stringify(env)}`
    )
  }
  return vars.reduce((utils, variable) => {
    const envValue = !!env[variable]
    const capitalVariable = capitalizeWord(variable)
    utils[`if${capitalVariable}`] = (value, alternate) => {
      return isUndefined(value) ? envValue : propIf(envValue, value, alternate)
    }
    utils[`ifNot${capitalVariable}`] = (value, alternate) => {
      return isUndefined(value) ? !envValue : propIfNot(envValue, value, alternate)
    }
    return utils
  }, {})
}

// utilities

function capitalizeWord(word) {
  return word.substring(0, 1).toUpperCase() + word.substring(1)
}

function isUndefined(val) {
  return typeof val === 'undefined'
}
