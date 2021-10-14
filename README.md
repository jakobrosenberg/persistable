<img src="./logo.svg" WIDTH=400>

# Persistable

#### Callback caching

**persistable** stores the return value of a callback on disk and returns it on subsequent calls.

### Installation

    npm install persistable

### Usage

```javascript
require('persitable')(/* options */)(Math.random)
```

### Basic example

```javascript
const persistable = require('persitable')

const persist = persistable(/* options */)

const value1 = persist(Math.random)
const value2 = persist(Math.random)

console.log(value1 === value2) // true
```

### Advanced example

```javascript
const persistable = require('persitable')

const persist = persistable({ outputDir: 'data' })

const value1 = persist(Math.random)
const value2 = persist(Math.random)
const value3 = persist(Math.random, true) // refresh on 2nd param
const value4 = persist(Math.random)

console.log(value1 === value2) // true
console.log(value2 != value3) // true
console.log(value3 === value4) // true
```

### API

<!-- Generated by documentation.js. Update this documentation by updating the source code. -->

##### Table of Contents

*   [PersistFn](#persistfn)
    *   [Parameters](#parameters)
*   [Persistable](#persistable)
    *   [Parameters](#parameters-1)
*   [Options](#options)
    *   [Properties](#properties)

#### PersistFn

Type: [Function](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Statements/function)

##### Parameters

*   `callback` **[function](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Statements/function)** callback to be persisted
*   `refresh` **[boolean](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Boolean)** call the callback (optional, default `false`)
*   `name` **[string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)?** defaults to hashed callback

####

#### Persistable

Creates new instance of persistable

Type: [Function](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Statements/function)

##### Parameters

*   `options` **Partial<[Options](#options)>?** 

Returns **Persist** 

#### Options

Type: [object](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object)

##### Properties

*   `outputDir` **[string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)?** location to save persisted return values
*   `minify` **[boolean](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Boolean)?** inline JSON objects
