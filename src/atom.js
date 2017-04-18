/* @flow */

import { inMemory } from './plugins';

export default (data : Object, createStore : Function = inMemory) => {
  const watchers = [];

  const transition = (...args) =>
    watchers.forEach(watcher => watcher(...args));

  return {
    ...createStore(data, transition),
    watch(fn) {
      watchers.push(fn);
    },
  };
};
