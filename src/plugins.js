/* @flow */

export const inMemory = (data : Object, transition : Function) => {
  let rootState = data;
  return {
    write(fn : Function) {
      const oldState = this.read();
      const newState = fn(oldState);
      transition(newState, oldState);
      rootState = newState;
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
      const oldState = this.read();
      const newState = fn(oldState);
      transition(newState, oldState);
      store.setItem(key, JSON.stringify(newState));
    },
    read() {
      return JSON.parse(store.getItem(key));
    },
  };
};
