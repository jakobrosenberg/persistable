const { existsSync, writeFileSync, mkdirSync } = require('fs')
const { resolve } = require('path')
const { fnToName } = require('./utils')

/**
 * @typedef {object} Defaults
 * @prop {string} outputDir
 */

/** @type {Defaults} */
const defaults = {
  outputDir: 'persistable',
}

/**
 * @param {Partial<Defaults>} options
 * @returns
 */
const persistable = (options = {}) => async (callback, refresh, name) => {
  name = name || fnToName(callback)
  options = Object.assign(defaults, options)
  const filepath = resolve(options.outputDir, name + '.js')

  if (!existsSync(filepath) || refresh) {
    mkdirSync(options.outputDir, { recursive: true })
    const res = await callback()
    writeFileSync(filepath, 'module.exports = ' + JSON.stringify(res))
  }

  delete require.cache[require.resolve(filepath)]

  return require(filepath)
}

module.exports = persistable
