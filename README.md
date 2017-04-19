# atom-store
[![Circle CI](https://circleci.com/gh/jameshopkins/atom-store.svg?style=svg)](https://circleci.com/gh/jameshopkins/atom-store)

## API

### `createAtom(val[, plugin]) => AtomInstance`

Creates a new atom instance.

#### Arguments
- `val`: The initial stored value within the atom
- `plugin` (optional): A function that returns a `read` and `write` method, with the same semantics described in the [`AtomInstance` API](#atominstance-api). If `plugin` is not supplied, the default in-memory storage interface is used.

#### An interface for external persistence
Your atom doesn't necessarily have to be referenced in memory. You can define your own interface into any external persistence type, through the optional `plugin` function.
For example, [Web Storage API's `Storage` interface](https://developer.mozilla.org/en-US/docs/Web/API/Storage), for which a plugin is already defined.

It must return two methods - `write` and `read`. These provide the transactional semantics between the defined store and the consumer application that invokes the mutations.

### `AtomInstance` API

#### `.read()`

Returns the current atom value.

#### `.write(fn(currentValue) {})`

Replaces the current atom value with the return value of the `fn` invocation.

##### Arguments
- `fn`: A function whose return value is the new value of the store. The provided argument to `fn` is the current atom value (`currentValue`). You can pass any additional arguments to `fn` by binding them. For example, `fn.bind(null, firstArg, secondArg)`

#### `.watch(fn(prevValue, nextValue) {})`
Invokes the given function whenever the atom value changes.

##### Arguments
- `fn`: A function that is invoked whenever the atom value changes.

## Test suite

You may use the integrated test suite for your own custom plugins
```js
import tape from 'tape';
import testPlugin from 'atom/testPlugin';
import myPlugin from './myPlugin';

// Non-curried
tape('My custom plugin works', test => {
  // Some setup & initial tests here
  testPlugin(myPlugin, test);
  // Some teardown & additional tests here
});

// Curried
tape('My custom plugin works', testPlugin(myPlugin));
```
