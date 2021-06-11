const { test } = require('uvu')
const assert = require('uvu/assert')
const persistable = require('../index.js')
const persist = persistable({ outputDir: __dirname + '/temp' })

let counter = 0

const syncFunction = () => 'result from sync function ' + counter++
const asyncFunction = async () => 'result from async function ' + counter++

test.before(() => {
  require('fs').rmdirSync(__dirname + '/temp', { recursive: true })
})

test('can persist a value from sync function', async () => {
  const result1 = await persist(syncFunction)
  const result2 = await persist(syncFunction)

  Object.keys(require.cache).forEach((key) => delete require.cache[key])
  const resultRefreshed = await persist(syncFunction, true)

  assert.is(result1, 'result from sync function 0')
  assert.is(result2, 'result from sync function 0')
  assert.is(resultRefreshed, 'result from sync function 1')
})

test('can persist a value from async function', async () => {
  const result1 = await persist(asyncFunction)
  const result2 = await persist(asyncFunction)

  Object.keys(require.cache).forEach((key) => delete require.cache[key])
  const resultRefreshed = await persist(asyncFunction, true)

  assert.is(result1, 'result from async function 2')
  assert.is(result2, 'result from async function 2')
  assert.is(resultRefreshed, 'result from async function 3')
})

test('can use specified name', async () => {
  const result1 = await persist(syncFunction, false, 'explicit')
  const result2 = await persist(syncFunction, false, 'explicit')

  Object.keys(require.cache).forEach((key) => delete require.cache[key])
  const resultRefreshed = await persist(syncFunction, true, 'explicit')

  assert.ok(require('fs').existsSync(__dirname + '/temp/explicit.js'))
  assert.is(result1, 'result from sync function 4')
  assert.is(result2, 'result from sync function 4')
  assert.is(resultRefreshed, 'result from sync function 5')
})

test.run()
