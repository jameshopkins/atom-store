/* @flow */

import { inMemory } from './plugins';

export default (data : Object, createStore : Function = inMemory) => {
  const watchers = [];

  const transition = (next, prev) =>
    watchers.forEach(watcher => watcher(prev, next));

  return {
    ...createStore(data, transition),
    watch(fn) {
      watchers.push(fn);
    },
  };
};
