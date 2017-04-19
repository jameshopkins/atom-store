import tape from 'tape';
import injectr from 'injectr';
import { transform } from 'babel-core';
import createAtom from '../src/atom';

injectr.onload = (filename, content) => transform(content, { filename }).code;

tape.test('Plugin architecture for external persisance', test => {
  test.test('Integration with a user-defined instance', t => {
    t.plan(4);
    const initial = { hello: 'moo' };

    const read = () => undefined;
    const write = () => undefined;

    const atom = createAtom(initial, data => {
      t.equal(data, initial, 'Adapter called with correct initial data');
      return { read, write };
    });
    t.notEqual(atom.read, atom.write, 'Read & write are different functions');
    t.equal(atom.read, read, 'Read exposed as first-class member');
    t.equal(atom.write, write, 'Write exposed as first-class member');
  });

  test.test('Plugin architecture for external persisance', t => {
    t.plan(1);
    const initial = { foo: 'bar' };

    const inMemory = data => {
      t.equal(data, initial, 'inMemory plugin called if no other defined');
    };

    injectr('../src/atom.js', { './plugins': { inMemory } }, global)
      .default(initial);
  });
});
