# esopmoc

The esopmoc library is a simple composition library supporting both sync and
async functions. It makes available four functions: `compose`, `sequence`,
`composeSync`, and `sequenceSync`.

`compose` takes a list of asynchronous functions and executes them in reverse
order, passing the previously returned value to the next function as its first
parameter. Each function passed must return a `Promise`.

```
import { compose } from 'esopmoc';

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
console.log(composed('tester')); // OUTPUTS: "tester 3 2 1"
```

`composeSync` takes a list of functions and executes them in reverse order,
passing the previously returned value to the next function.

```
import { composeSync } from 'esopmoc';

function fun1(next) { return `${next} 1`; }
function fun2(next) { return `${next} 2`; }
function fun3(next) { return `${next} 3`; }

const composed = composeSync(fun1, fun2, fun3);
console.log(composed('tester')); // OUTPUTS: "tester 3 2 1"
```

`sequence` takes a list of asynchronous functions and executes them in order,
passing the previously returned value to the next function as its first
parameter. Each function passed must return a `Promise`.

```
import { sequence } from 'esopmoc';

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
console.log(composed('tester')); // OUTPUTS: "tester 1 2 3"
```

`sequenceSync` takes a list of functions and executes them in order, passing
the previously returned value to the next function.

```
import { sequenceSync } from 'esopmoc';

function fun1(next) { return `${next} 1`; }
function fun2(next) { return `${next} 2`; }
function fun3(next) { return `${next} 3`; }

const sequenced = sequenceSync(fun1, fun2, fun3);
console.log(composed('tester')); // OUTPUTS: "tester 1 2 3"
```
