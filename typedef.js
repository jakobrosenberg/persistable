/**
 * @callback PersistFn
 * @param {function} callback callback to be persisted
 * @param {boolean} [refresh=false] call the callback
 * @param {string} [name] defaults to hashed callback
 */

/**
 * @typedef {PersistFn & Options} Persist
 */

/**
 * Creates new instance of persistable
 * @callback Persistable
 * @param {Partial<Options>} [options]
 * @returns {Persist}
 */

/**
 * @typedef {object} Options
 * @prop {string} [outputDir] location to save persisted return values
 * @prop {boolean} [minify=false] inline JSON objects
 */
