import createAtom from '../src/atom';
import R from 'ramda';

export default R.curry((plugin, test) => test.test('Plugin', t => {
  t.plan(5);

  const firstValue = { firstValue: true };
  const secondValue = { secondValue: false };
  const atom = createAtom(firstValue, plugin);

  atom.watch((oldValue, newValue) => {
    t.ok('Watcher invoked');
    t.deepEqual(oldValue, firstValue, 'Watcher oldValue correct');
    t.deepEqual(newValue, secondValue, 'Watcher newValue correct');
  });
  t.deepEqual(atom.read(), firstValue, 'Correct initial value can be read');
  atom.write(() => secondValue);
  t.deepEqual(atom.read(), secondValue, 'Correct new value can be read');
}));
