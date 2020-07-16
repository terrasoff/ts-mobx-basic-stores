import { ArrayStore } from '@src';
import { ArrayElementNotFoundError, ArrayIndexNotFoundError } from '../src/Array/Errors';

describe('count', () => {

  test.each(
    [
      [
        'Empty array',
        [],
      ],
      [
        'Array with single element',
        [1],
      ],
      [
        'Array of two elements',
        [1, 2],
      ],
    ]
  )('%s', (
    title: string,
    input: Array<number>,
  ) => {
    expect(new ArrayStore<number>(input).count).toEqual(input.length);
  });

});

describe('setItems()', () => {

  test.each([
    [
      'Set empty array',
      [],
    ],
    [
      'Set array of single element',
      [1],
    ],
    [
      'Set array of two elements',
      [1, 2],
    ],
  ])('%s', (
    title: string,
    input: Array<number>,
  ) => {
    const store = new ArrayStore<number>();
    expect(store.items).toEqual([]);
    expect(store.setItems(input).items).toEqual(input);
  });

});

describe('isDefault', () => {

  test('Default value is empty array', (): void => {
    const store = new ArrayStore<number>();
    expect(store.items).toEqual([]);
    expect(store.isEmpty).toBeTruthy();
  });

});

describe('filter()', () => {

  test.each([
    [
      'Filter no elements',
      [1],
      (x): boolean => x !== 1,
      [],
    ],
    [
      'Filter elements',
      [1],
      (x): boolean => x === 1,
      [1],
    ],
  ])('%s', (
    title: string,
    input: Array<number>,
    predicate: (value: number) => boolean,
    output: Array<number>
  ) => {
    const store = new ArrayStore<number>(input);
    store.filter(predicate);
    expect(store.items).toEqual(output);
  });

});

describe('isEmpty', () => {

  test.each(
    [
      [
        [],
        true,
      ],
      [
        [1],
        false
      ],
    ]
  )('Count %i', (
    input: Array<number>,
    result: boolean,
  ) => {
    expect(new ArrayStore<number>(input).isEmpty).toEqual(result);
  });

});

describe('add', () => {

  test('Add to empty array', () => {
    const store = new ArrayStore<number>();
    expect(store.add(1).items).toEqual([1]);
  });

  test('Add to existing array', () => {
    const store = new ArrayStore<number>([1]);
    expect(store.add(2).items).toEqual([1, 2]);
  });

});

describe('insert', () => {

  test('Insert to empty array', () => {
    const store = new ArrayStore<number>();
    expect(store.insert(0, 1).items).toEqual([1]);
  });

  test('Insert to existing array', () => {
    const store = new ArrayStore<number>([1, 3]);
    expect(store.insert(1, 2).items).toEqual([1, 2, 3]);
  });

});

describe('remove', () => {

  test('Remove nonexistent item', () => {
    const store = new ArrayStore<number>();
    expect(store.remove(1)).toBeFalsy();
  });

  test('Insert to existing array', () => {
    const store = new ArrayStore<number>([1, 2]);
    expect(store.remove(1)).toBeTruthy();
    expect(store.items).toEqual([2]);
  });

});

describe('removeAt', () => {

  test('Remove nonexistent item', () => {
    const store = new ArrayStore<number>();
    expect(store.removeAt(0)).toBeFalsy();
  });

  test('Insert to existing array', () => {
    const store = new ArrayStore<number>([1, 2, 3]);
    expect(store.removeAt(1)).toBeTruthy();
    expect(store.items).toEqual([1, 3]);
  });

});

describe('some', () => {

  test('Has some', () => {
    const store = new ArrayStore<number>([1, 2]);
    expect(store.some(1)).toBeTruthy();
  });

  test('Has no some', () => {
    const store = new ArrayStore<number>([1, 2]);
    expect(store.some(3)).toBeFalsy();
  });

});

describe('find', () => {

  test('Find element', () => {
    const store = new ArrayStore<number>([1]);
    expect(store.find(x => x === 1)).toEqual(1);
  });

  test('Find no element', () => {
    const store = new ArrayStore<number>([1]);
    expect(store.find(x => x === 2)).toBeUndefined();
  });

});

describe('findIndex', () => {

  test('Find element', () => {
    const store = new ArrayStore<number>([1]);
    expect(store.findIndex(x => x === 1)).toEqual(0);
  });

  test('Find no element', () => {
    const store = new ArrayStore<number>([1]);
    expect(store.findIndex(x => x === 2)).toEqual(-1);
  });

});

describe('updateByIndex', () => {

  test('Update element', () => {
    const store = new ArrayStore<number>([1]);
    expect(store.updateByIndex(0, 2).items).toEqual([2]);
  });

  test('Find no element', () => {
    const store = new ArrayStore<number>([1]);
    expect(() => store.updateByIndex(1, 3)).toThrow(ArrayIndexNotFoundError);
    expect(store.items).toEqual([1]);
  });

});

describe('update', () => {

  test('Update element', () => {
    const store = new ArrayStore<number>([1]);
    expect(store.update(x => x === 1, 2).items).toEqual([2]);
  });

  test('Find no element', () => {
    const store = new ArrayStore<number>([1]);
    expect(() => store.update(x => x === 2, 3)).toThrow(ArrayElementNotFoundError);
    expect(store.items).toEqual([1]);
  });

});

describe('first', () => {

  test('First', () => {
    const store = new ArrayStore<number>([1, 2]);
    expect(store.first).toEqual(1);
  });

});

describe('last', () => {

  test('Last', () => {
    const store = new ArrayStore<number>([1, 2]);
    expect(store.last).toEqual(2);
  });

});

describe('reset', () => {

  test('Reset', () => {
    const store = new ArrayStore<number>([1]);
    store.setItems([2]);
    store.reset();
    expect(store.items).toEqual([1]);
  });

});

describe('clear', () => {

  test('Clear', () => {
    const store = new ArrayStore<number>([1]);
    store.clear();
    expect(store.items).toEqual([]);
  });

});

describe('toggle', () => {
  test('Toggle from empty state', () => {
    const store = new ArrayStore<number>();
    expect(store.toggle(1).items).toEqual([1]);
  });
  test('Toggle from existing state', () => {
    const store = new ArrayStore<number>([1]);
    expect(store.toggle(1).items).toEqual([]);
  });
});

describe('get', () => {
  test('Get by index', () => {
    const store = new ArrayStore<number>([1]);
    expect(store.at(0)).toEqual(1);
  });
  test('Get by undefined index', () => {
    const store = new ArrayStore<number>([1]);
    expect(store.at(1)).toBeUndefined();
  });
});
