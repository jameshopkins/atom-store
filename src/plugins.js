/* @flow */

export const inMemory = (initial : Object, transition : Function) => {
  let rootState = initial;
  const read = () => rootState;
  const write = (fn : Function, ...context: any) => {
    const oldState = read();
    const newState = fn(oldState);
    transition(newState, oldState, ...context);
    rootState = newState;
    return read();
  };
  return { read, write };
};

export const webStorage = (
  { type, key } : Object,
  initial : Object | void,
  transition : Function
) => {
  const store = window[`${type}Storage`];
  if (initial !== undefined) {
    store.setItem(key, JSON.stringify(initial));
  }
  const read = () => JSON.parse(store.getItem(key));
  const write = (fn : Function, ...context : any) => {
    const oldState = read();
    const newState = fn(oldState);
    transition(newState, oldState, ...context);
    store.setItem(key, JSON.stringify(newState));
    return read();
  };
  return { read, write };
};
