/* @flow */

import { inMemory } from './plugins';
import setAsap from 'setasap';

export default (data : Object, createStore : Function = inMemory) => {
  const watchers = [];

  const transition = (...args) =>
    watchers.forEach(watcher => watcher(...args));

  return {
    ...createStore(data, transition),
    watch(fn) {
      const watcher = (...args) => setAsap(() => fn(...args));
      watchers.push(watcher);
    },
  };
};
