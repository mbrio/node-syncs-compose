# syncs-compose

A simple composition library supporting both sync and async functions written in
flow and es2016.

[![Build Status](https://api.travis-ci.org/mbrio/node-syncs-compose.svg?branch=master)](https://travis-ci.org/mbrio/node-syncs-compose)

[![NPMnode- Status](https://nodei.co/npm/syncs-compose.png?downloads=true)](https://npmjs.org/package/syncs-compose)

## Git

```
$ git clone https://github.com/mbrio/node-syncs-compose.git
```

## Install

```
# npm install syncs-compose
```

## Build

Run the following command within the *syncs-compose* repo to build es5 JS files:

```
$ npm run build
```

When the above command is executed a *lib* folder will be created with the
compiled JS files within. To cleanup the *lib* folder you can run the following
command within the *syncs-compose* repo:

```
$ npm run clean
```

## Testing

Run the following command within the *syncs-compose* repo to test the library:

```
$ npm test
```

If you'd like to lint the source:

```
$ npm run lint
```

## API

The syncs-compose library is a simple composition library supporting both sync
and async functions. It makes available four functions: `compose`, `sequence`,
`compose.sync`, and `sequence.sync`.

`compose` takes a list of asynchronous functions and executes them in reverse
order, passing the previously returned value to the next function as its first
parameter. Each function passed must return a `Promise`.

```
import { compose } from 'syncs-compose';

function fun1(next) {
  return new Promise((resolve, reject) => resolve(`${next} 1`));
}

function fun2(next) {
  return new Promise((resolve, reject) => resolve(`${next} 2`));
}

function fun3(next) {
  return new Promise((resolve, reject) => resolve(`${next} 3`));
}

const composed = compose(fun1, fun2, fun3);
composed('tester').then(val => console.log(val)); // OUTPUTS: "tester 3 2 1"
```

`compose.sync` takes a list of functions and executes them in reverse order,
passing the previously returned value to the next function.

```
import { compose.sync } from 'syncs-compose';

function fun1(next) { return `${next} 1`; }
function fun2(next) { return `${next} 2`; }
function fun3(next) { return `${next} 3`; }

const composed = compose.sync(fun1, fun2, fun3);
console.log(composed('tester')); // OUTPUTS: "tester 3 2 1"
```

`sequence` takes a list of asynchronous functions and executes them in order,
passing the previously returned value to the next function as its first
parameter. Each function passed must return a `Promise`.

```
import { sequence } from 'syncs-compose';

function fun1(next) {
  return new Promise((resolve, reject) => resolve(`${next} 1`));
}

function fun2(next) {
  return new Promise((resolve, reject) => resolve(`${next} 2`));
}

function fun3(next) {
  return new Promise((resolve, reject) => resolve(`${next} 3`));
}

const sequenced = sequence(fun1, fun2, fun3);
sequenced('tester').then(val => console.log(val)); // OUTPUTS: "tester 1 2 3"
```

`sequence.sync` takes a list of functions and executes them in order, passing
the previously returned value to the next function.

```
import { sequence.sync } from 'syncs-compose';

function fun1(next) { return `${next} 1`; }
function fun2(next) { return `${next} 2`; }
function fun3(next) { return `${next} 3`; }

const sequenced = sequence.sync(fun1, fun2, fun3);
console.log(sequenced('tester')); // OUTPUTS: "tester 1 2 3"
```

## License

*syncs-compose* is [BSD licensed](./LICENSE).
