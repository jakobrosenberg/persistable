<img src="./logo.svg" WIDTH=400>

# Persistable

#### Callback caching

Persistable stores the value of a callback on disk and returns it on subsequent calls.

### Installation

```
npm install persistable
```

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
const value4 = persist(Math.random) // refresh on 2nd param

console.log(value1 === value2) // true
console.log(value2 != value3) // true
console.log(value3 === value4) // true
```

<a href='https://www.freepik.com/vectors/school'>School vector created by pch.vector - www.freepik.com</a>
