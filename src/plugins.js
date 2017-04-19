/* @flow */

export const inMemory = (data : Object, transition : Function) => {
  let rootState = data;
  const read = () => rootState;
  const write = (fn : Function) => {
    const oldState = read();
    const newState = fn(oldState);
    transition(oldState, newState);
    rootState = newState;
    return read();
  };
  return { read, write };
};

export const webStorage = (
  { type, key } : Object,
  data : Object,
  transition : Function
) => {
  const store = window[`${type}Storage`];
  const read = () => JSON.parse(store.getItem(key));
  const write = (fn : Function) => {
    const oldState = read();
    const newState = fn(oldState);
    transition(oldState, newState);
    store.setItem(key, JSON.stringify(newState));
  };
  return { read, write };
};
