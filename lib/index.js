/// <reference path="../typedef.js" />

const { existsSync, writeFileSync, mkdirSync, readFileSync } = require('fs')
const { resolve } = require('path')
const { fnToName } = require('./utils')

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
    const filepath = resolve(persist.outputDir, name + '.json')

    if (!existsSync(filepath) || refresh) {
      mkdirSync(persist.outputDir, { recursive: true })
      const res = await callback()
      writeFileSync(
        filepath,
        JSON.stringify(res, null, persist.minify ? 0 : 2),
      )
    }

    return JSON.parse(readFileSync(filepath, 'utf-8'))
  }

  Object.assign(persist, options)

  return persist
}

module.exports = persistable
