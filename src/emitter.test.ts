import Emitter from './emitter';

describe('Emitter', () => {
  let emit: any;

  beforeEach(() => {
    emit = new Emitter();
  });

  describe('.on', () => {
    it('is a function', () => {
      expect(emit.on).toBeDefined();
      expect(typeof emit.on).toEqual('function');
    });

    it('registers handler for new type', () => {
      const morty = () => {};
      emit.on('rick', morty);

      expect(emit.listeners.has('rick')).toBeTruthy();
      expect(emit.listeners.get('rick')).toEqual([morty]);
    });

    it('registers handlers for any type strings', () => {
      const jerry = () => {};
      emit.on('constructor', jerry);

      expect(emit.listeners.has('constructor')).toBeTruthy();
      expect(emit.listeners.get('constructor')).toEqual([jerry])
    });

    it('appends handler for existing type', () => {
      const rick = () => {};
      const morty = () => {};
      emit.on('boom', rick)
      emit.on('boom', morty)

      expect(emit.listeners.has('boom')).toBeTruthy();
      expect(emit.listeners.get('boom')).toEqual([rick, morty]);
    });

    it('can simulate "once"', () => {
      const counter = jest.fn();
      const handlers = [1, 2, 3, 4, 5].map(i => {
        // create .once fn
        function fn() {
          emit.off('once', fn);
          counter();
        }
        return fn;
      });
      handlers.forEach(fn => emit.on('once', fn));
      emit.emit('once');
      expect(emit.listeners.has('once')).toBeTruthy();
      expect(emit.listeners.get('once')).toEqual([]);
      expect(counter).toHaveBeenCalledTimes(5);
    });
  });

  describe('.off', () => {
    it('is a function', () => {
      expect(emit.off).toBeDefined()
      expect(typeof emit.off).toEqual('function')
    })

    it('removes handler for type', () => {
      const rick = () => {};
      emit.on('pickle', rick);
      emit.off('pickle', rick);

      expect(emit.listeners.has('pickle')).toBeTruthy();
      expect(emit.listeners.get('pickle')).toEqual([]);
    });
  });

  describe('.emit', () => {
    it('is a function', () => {
      expect(emit.emit).toBeDefined()
      expect(typeof emit.emit).toEqual('function')
    })

    it('invokes handler for type', () => {
      const jerry = { mr: 'meeseeks' };

      emit.on('pickle', (one: any, two: any) => {
        expect(one).toEqual(jerry);
        expect(two).toBeUndefined();
      });

      emit.emit('pickle', jerry);
    });
  });
});
