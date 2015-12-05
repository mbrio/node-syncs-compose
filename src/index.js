/* @flow */

type CB = (x: any) => any;

const RIGHT: string = '@@compose/direction/RIGHT';
const LEFT: string = '@@compose/direction/LEFT';

function c(fns: Array<CB>, dir: string = RIGHT, useAsync: boolean = false) : any {
  const reducer = dir === RIGHT ?
    fns.reduceRight.bind(fns) :
    fns.reduce.bind(fns)

  const handler = useAsync ?
    (p: any, f: CB) => p.then((ip: any) => f(ip)) :
    (p: any, f: CB) => f(p);

  return (x: any): any => { return reducer(handler, useAsync ? Promise.resolve(x) : x); }
}

export function composeSync(...fns: Array<CB>): any { return c(fns); }
export function sequenceSync(...fns: Array<CB>): any { return c(fns, LEFT); }

export function compose(...fns: Array<CB>): any { return c(fns, RIGHT, true); }
export function sequence(...fns: Array<CB>): any { return c(fns, LEFT, true); }
