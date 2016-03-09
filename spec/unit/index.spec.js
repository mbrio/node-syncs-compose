/* @flow */

type emptyCB = () => void;
type tCB = (cb: emptyCB) => void;
declare function describe(m: string, cb: emptyCB): void;
declare function it(m: string, cb: tCB): void;;

import { compose, sequence } from '../../src';

function fun1Sync(next: string): string { return `${next} 1`; }
function fun2Sync(next: string): string { return `${next} 2`; }
function fun3Sync(next: string): string { return `${next} 3`; }

function fun1(next: string): Object { return Promise.resolve(`${next} 1`); }
function fun2(next: string): Object { return Promise.resolve(`${next} 2`); }
function fun3(next: string): Object { return Promise.resolve(`${next} 3`); }

describe('syncs-compose', () => {
  describe('#compose.sync', () => {
    it('should compose functions in reverse order, synchronously', () => {
      expect(compose.sync(fun1Sync, fun2Sync, fun3Sync)('tester'))
        .toBe('tester 3 2 1');
    });
  });

  describe('#sequence.sync', () => {
    it('should compose functions in order, synchronously', () => {
      expect(sequence.sync(fun1Sync, fun2Sync, fun3Sync)('tester'))
        .toBe('tester 1 2 3');
    });
  });

  describe('#compose', () => {
    pit('should compose functions in reverse order, synchronously', () => {
      return compose(fun1, fun2, fun3)('tester').then(val => {
        expect(val).toBe('tester 3 2 1');
      });
    });
  });

  describe('#sequence', () => {
    pit('should compose functions in order, synchronously', () => {
      return sequence(fun1, fun2, fun3)('tester').then(val => {
        expect(val).toBe('tester 1 2 3');
      });
    });
  });
});
