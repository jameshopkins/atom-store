import createAtom from './../src/atom';
import { webStorage } from './../src/plugins';

describe('Plugins', () => {
  describe('In-memory', () => {
    it('reads', () => {
      const atom = createAtom('hello');
      expect(atom.read()).to.equal('hello');
    });
    it('writes', () => {
      const atom = createAtom('hello');
      const watcher = spy();
      atom.watch(watcher);
      const onChange = stub().returns('nice');
      const writeped = atom.write(onChange, 'test context');
      expect(watcher).to.have.been.calledWithExactly('nice', 'hello', 'test context');
      expect(writeped).to.equal('nice');
      expect(onChange).to.have.been.calledWithExactly('hello');
      expect(atom.read()).to.equal('nice');
    });
  });
  describe('Web', () => {
    it('reads', () => {
      const getItem = stub().returns('{"hello":"wahey"}');
      const setItem = spy();
      global.window = {
        localStorage: {
          getItem,
          setItem,
        },
      };
      const atom = createAtom('initial', webStorage.bind(null, { type: 'local', key: 'test' }));
      expect(setItem).to.have.been.calledWithExactly('test', '"initial"');
      expect(atom.read()).to.deep.equal({ hello: 'wahey' });
    });
    it('writes', () => {
      const getItem = stub().returns('{"hello":"wahey"}');
      const setItem = spy();
      global.window = {
        localStorage: {
          getItem,
          setItem,
        },
      };
      const atom = createAtom('hello', webStorage.bind(null, { type: 'local', key: 'test' }));
      const watcher = spy();
      atom.watch(watcher);
      const writeped = atom.write(() => ({ changed: 'for the better' }), 'test context');
      expect(watcher).to.have.been.calledWithExactly(
        { changed: 'for the better' }, { hello: 'wahey' }, 'test context'
      );
      expect(writeped).to.not.be.undefined; // eslint-disable-line no-unused-expressions
      expect(setItem).to.have.been.calledWithExactly('test', '{"changed":"for the better"}');
    });
    it('Use localStorage for default initial data', () => {
      const getItem = stub().returns('{"hello":"wahey"}');
      const setItem = spy();
      global.window = {
        localStorage: {
          getItem,
          setItem,
        },
      };
      const atom = createAtom(undefined, webStorage.bind(null, { type: 'local', key: 'test' }));
      expect(setItem).to.not.have.been.called; // eslint-disable-line no-unused-expressions
      expect(atom.read()).to.deep.equal({ hello: 'wahey' });
    });
  });
});
