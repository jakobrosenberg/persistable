/**
 * @callback persist
 * @param {function} callback callback to be persisted
 * @param {boolean} [refresh=false] call the callback
 * @param {string} [name] defaults to hashed callback
 */

/**
 * Creates new instance of persistable
 * @callback persistable
 * @param {Partial<Options>} [options]
 * @returns {persist}
 */

/**
 * @typedef {object} Options
 * @prop {string} [outputDir] location to save persisted return values
 * @prop {boolean} [minify=false] inline JSON objects
 */
