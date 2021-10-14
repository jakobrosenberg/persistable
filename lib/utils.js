const stringHashCode = (str) =>
  str
    .split('')
    .reduce((a, b) => {
      a = (a << 5) - a + b.charCodeAt(0)
      return a & a
    }, 0)
    .toString(36)

const fnToName = (fn) => {
  const fnStr = fn.toString()
  const length = fnStr.length
  const snippet = fnStr
    .replace(/[^\w]/gm, '_')
    .replace(/\_+/gm, '_')
    .replace(/^\_/, '')
    .slice(0, 20)
  return snippet + '-' + length + '-' + stringHashCode(fnStr)
}

module.exports = { fnToName }
