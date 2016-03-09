/* @flow */

/**
 * A flow type that corresponds with our composition callback function
 * @typedef {function(?Object)} CB
 */
type CB = (x: any) => any;

/**
 * Instruct syncs-compose to execute functions from right to left
 * @type {string}
 */
const RIGHT: string = '@@compose/direction/RIGHT';

/**
 * Instruct syncs-compose to execute functions from left to right
 * @type {string}
 */
const LEFT: string = '@@compose/direction/LEFT';

/**
 * Executes synchronous or asynchronous functions either serially or as a
 * composition.
 *
 * When called as a composition it takes a list of functions and executes them
 * in reverse order, passing the previously returned value to the next function
 * as its first parameter.
 *
 * When called as a sequence it takes a list of functions and executes them in
 * order, passing the previously returned value to the next function as its
 * first parameter.
 *
 * When executing asynchronous functions, each function must return a Promise.
 *
 * @param {CB[]} fns The functions to execute
 * @param {string} dir The direction to execute the functions
 * @param {boolean} useAsync Are the functions asynchronous
 *
 * @return {?Object} The result of the last executed function
 */
function c(fns: Array<CB>, dir: string = RIGHT, useAsync: boolean = false) : any {
  const reducer = dir === RIGHT ?
    fns.reduceRight.bind(fns) :
    fns.reduce.bind(fns);

  const handler = useAsync ?
    (p: any, f: CB) => p.then((ip: any) => f(ip)) :
    (p: any, f: CB) => f(p);

  return (x: any): any => { return reducer(handler, useAsync ? Promise.resolve(x) : x); };
}

/**
 * Executes asynchronous functions as a composition, each function must return a
 * Promise.
 *
 * @param {...CB} fns The functions to execute

 * @return {Promise} The Promise of the last executed function
 */
function compose(...fns: Array<CB>): any { return c(fns, RIGHT, true); }

/**
 * Executes asynchronous functions as a sequence, each function must return a
 * Promise.
 *
 * @param {...CB} fns The functions to execute

 * @return {Promise} The Promise of the last executed function
 */
function sequence(...fns: Array<CB>): any { return c(fns, LEFT, true); }

/**
 * Executes synchronous functions as a composition.
 *
 * @param {...CB} fns The functions to execute

 * @return {?object} The result of the last executed function
 */
compose.sync = function composeSync(...fns: Array<CB>): any { return c(fns, RIGHT, false); };

/**
 * Executes synchronous functions as a sequence.
 *
 * @param {...CB} fns The functions to execute

 * @return {?object} The result of the last executed function
 */
sequence.sync = function sequenceSync(...fns: Array<CB>): any { return c(fns, LEFT, false); };

export { compose, sequence };
