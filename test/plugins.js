import tape from 'tape';
import { LocalStorage } from 'node-localstorage';
import testPlugin from './index.js';
import {
  inMemory,
  webStorage,
} from '../src/plugins';

tape.test('Default plugin', testPlugin(undefined));

tape.test('In-memory plugin', testPlugin(inMemory));

tape.test('webStorage plugin', test => {
  test.plan(3);

  global.window = { localStorage: new LocalStorage('./.localstorage.log') };
  const { localStorage } = window;

  localStorage.setItem('test', 'null');
  test.equal(
    localStorage.getItem('test'),
    'null',
    'localStorage is available'
  );

  testPlugin(
    (...args) => webStorage({ type: 'local', key: 'test' }, ...args),
    test
  );

  // Force test to run synchronously
  test.test('localStorage data correct', t => {
    t.plan(1);
    t.equal(
      localStorage.getItem('test'),
      JSON.stringify({ secondValue: false })
    );
  });
});
