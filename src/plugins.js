/* @flow */

export const inMemory = (data : Object, transition : Function) => {
  let rootState = data;
  return {
    write(fn : Function) {
      rootState = transition(fn(this.read()), this.read());
      return rootState;
    },
    read() {
      return rootState;
    },
  };
};

export const webStorage = ({ type, key } : Object, data : Object, transition : Function) => {
  const store = window[`${type}Storage`];
  return {
    write(fn: Function) {
      const rootState = transition(fn(this.read()), this.read());
      store.setItem(key, JSON.stringify(rootState));
    },
    read() {
      return JSON.parse(store.getItem(key));
    },
  };
};
