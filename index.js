const { existsSync, writeFileSync, mkdirSync } = require('fs')
const { resolve } = require('path')
const { fnToName } = require('./utils')
// @ts-ignore
require('./typedef') 

/** @type {Options} */
const defaults = {
  outputDir: 'persistable',
}

/** @type {persistable} */
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
