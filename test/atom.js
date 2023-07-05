/* eslint-disable no-unused-expressions */

import createAtom from './../src/atom';

describe('Atom', () => {
  describe('Plugin architecture for external persisance', () => {
    it('integration with a user-defined instance', () => {
      const read = spy();
      const write = spy();

      const adapter = stub().returns({
        read,
        write,
      });

      const data = { hello: 'moo' };
      const atom = createAtom(data, adapter);

      expect(adapter).to.have.been.calledWith(data);

      // Plugin read and write are exposed as first-class members
      expect(atom.read).to.equal(read);
      expect(atom.write).to.equal(write);
    });
    it('uses a default in-memory instance if a user-defined one isn\'t defined', () => {
      const inMemory = spy();
      const createAtomInstance = injectr('../../src/atom.js', {
        './plugins': {
          inMemory,
        },
      });
      createAtomInstance.default({ wahey: 'naughty' });
      expect(inMemory).to.have.been.called;
    });
  });
  describe('Watchers', () => {
    it('calls watchers on write', () => {
      const watcher = spy();
      const atom = createAtom('hello');
      atom.watch(watcher);
      atom.write(() => 'nice');
      expect(watcher).calledWithExactly('nice', 'hello');
    });

    it('can un-watch', () => {
      const watcher = spy();
      const atom = createAtom('hello');
      atom.watch(watcher);
      atom.unwatch(watcher);
      atom.write(() => 'nice');
      expect(watcher).to.not.have.been.called;
    });
  });
});
