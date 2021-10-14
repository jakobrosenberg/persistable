const { readFileSync, existsSync, readdirSync } = require('fs')
const { test } = require('uvu')
const assert = require('uvu/assert')
const persistable = require('../lib/index.js')
const persist = persistable({ outputDir: __dirname + '/temp' })

let counter = 0

const syncFunction = () => 'result from sync function ' + counter++
const asyncFunction = async () => 'result from async function ' + counter++
const syncFunctionObject = () => ({ counter: counter++ })

test.before(() => {
  if (existsSync(__dirname + '/temp'))
    require('fs').rmSync(__dirname + '/temp', { recursive: true })
})

test('can persist a value from sync function', async () => {
  const result1 = await persist(syncFunction)
  const result2 = await persist(syncFunction)

  const resultRefreshed = await persist(syncFunction, true)

  assert.is(result1, 'result from sync function 0')
  assert.is(result2, 'result from sync function 0')
  assert.is(resultRefreshed, 'result from sync function 1')
})

test('can persist a value from async function', async () => {
  const result1 = await persist(asyncFunction)
  const result2 = await persist(asyncFunction)

  const resultRefreshed = await persist(asyncFunction, true)

  assert.is(result1, 'result from async function 2')
  assert.is(result2, 'result from async function 2')
  assert.is(resultRefreshed, 'result from async function 3')
})

test('can use specified name', async () => {
  const result1 = await persist(syncFunction, false, 'explicit')
  const result2 = await persist(syncFunction, false, 'explicit')

  const resultRefreshed = await persist(syncFunction, true, 'explicit')

  assert.ok(require('fs').existsSync(__dirname + '/temp/explicit.json'))
  assert.is(result1, 'result from sync function 4')
  assert.is(result2, 'result from sync function 4')
  assert.is(resultRefreshed, 'result from sync function 5')
})

test('can persist objects', async () => {
  const result1 = await persist(syncFunctionObject)
  const result2 = await persist(syncFunctionObject)

  assert.equal(result1, { counter: 6 })
  assert.equal(result2, { counter: 6 })
})

test('JSON data minifies when specified', async () => {
  const persistInline = persistable({ outputDir: __dirname + '/temp', minify: true })
  await persist(syncFunctionObject, false, 'no-minify')
  await persistInline(syncFunctionObject, false, 'minify')

  assert.is(readFileSync(__dirname + '/temp/no-minify.json', 'utf-8').split('\n').length, 6)
  assert.is(readFileSync(__dirname + '/temp/minify.json', 'utf-8').split('\n').length, 1)
})

test('can change outputDir', async () => {
  const persist = persistable({ outputDir: __dirname + '/temp/' })
  persist.outputDir = __dirname + '/temp/changedDir'
  await persist(syncFunction)
  assert.ok(existsSync(__dirname + '/temp/changedDir'))
  assert.is(readdirSync(__dirname + '/temp/changedDir').length, 1)
})

test.run()
