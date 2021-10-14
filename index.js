const { existsSync, writeFileSync, mkdirSync } = require('fs')
const { resolve } = require('path')
const { fnToName } = require('./utils')
// @ts-ignore
require('./typedef')

/** @type {Options} */
const defaults = {
  outputDir: 'persistable',
  minify: false,
}

/** @type {Persistable} */
const persistable = (options = {}) => {
  options = Object.assign(defaults, options)

  /** @type {Persist} */
  const persist = async (callback, refresh, name) => {
    name = name || fnToName(callback)
    const filepath = resolve(persist.outputDir, name + '.js')

    if (!existsSync(filepath) || refresh) {
      mkdirSync(persist.outputDir, { recursive: true })
      const res = await callback()
      writeFileSync(
        filepath,
        'module.exports = ' + JSON.stringify(res, null, persist.minify ? 0 : 2),
      )
    }

    delete require.cache[require.resolve(filepath)]

    return require(filepath)
  }

  Object.assign(persist, options)

  return persist
}

module.exports = persistable
