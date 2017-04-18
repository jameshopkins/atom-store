/* @flow */

import { inMemory } from './plugins';
import setAsap from 'setasap';

export default (data : Object, createStore : Function = inMemory) => {
  const watchers = [];

  const transition = (next, prev) => {
    watchers.forEach(watcher => watcher(prev, next));
    return next;
  };

  return {
    ...createStore(data, transition),
    watch(fn) {
      const watcher = (...args) => setAsap(() => fn(...args));
      watchers.push(watcher);
    },
  };
};
