import { ArrayStore, SelectionStore } from '@src';

describe('isFull', () => {
  test('Check is full', () => {
    const store = new SelectionStore<number>({
      list: new ArrayStore<number>([1]),
    });
    expect(store.isFull).toBeFalsy();
    store.selected.add(1);
    expect(store.isFull).toBeTruthy();
  });
});

describe('isPartial', () => {
  test('Check is partial', () => {
    const store = new SelectionStore<number>({
      list: new ArrayStore<number>([1, 2]),
    });
    expect(store.isPartial).toBeFalsy();
    store.selected.add(1);
    expect(store.isPartial).toBeTruthy();
    store.selected.add(2);
    expect(store.isPartial).toBeFalsy();
  });
});

describe('isEmpty', () => {
  test('Check is partial', () => {
    const store = new SelectionStore<number>({
      list: new ArrayStore<number>([1]),
    });
    expect(store.isEmpty).toBeTruthy();
    store.selected.add(1);
    expect(store.isEmpty).toBeFalsy();
  });
});

describe('selectAll', () => {
  test('Select all', () => {
    const store = new SelectionStore<number>({
      list: new ArrayStore<number>([1, 2]),
    });
    expect(store.isEmpty).toBeTruthy();
    expect(store.selectAll().isFull).toBeTruthy();
  });
});

describe('clear', () => {
  test('Clear', () => {
    const store = new SelectionStore<number>({
      list: new ArrayStore<number>([1]),
    });
    expect(store.selectAll().isFull).toBeTruthy();
    expect(store.clear().isEmpty).toBeTruthy();
  });
});

describe('toggle', () => {
  test('Toggle', () => {
    const store = new SelectionStore<number>({
      list: new ArrayStore<number>([1]),
    });
    expect(store.isEmpty).toBeTruthy();
    expect(store.toggle(1)).toBeTruthy();
    expect(store.isFull).toBeTruthy();
    expect(store.toggle(1)).toBeTruthy();
    expect(store.isEmpty).toBeTruthy();
  });
  test('Toggle of element which can not be selected', () => {
    const store = new SelectionStore<number>({
      list: new ArrayStore<number>([1]),
      canSelect: (item: number): boolean => item !== 1,
    });
    expect(store.isSelectable(1)).toBeFalsy();
    expect(store.toggle(1).isEmpty).toBeTruthy();
  });
});

describe('toggleAll', () => {
  test('Toggle all', () => {
    const store = new SelectionStore<number>({
      list: new ArrayStore<number>([1, 2]),
    });
    expect(store.isEmpty).toBeTruthy();
    expect(store.toggleAll().isFull).toBeTruthy();
    expect(store.toggleAll().isEmpty).toBeTruthy();
  });
});

describe('isSelected', () => {
  test('Check if item is selected', () => {
    const store = new SelectionStore<number>({
      list: new ArrayStore<number>([1, 2]),
    });
    expect(store.isEmpty).toBeTruthy();
    store.select(1);
    expect(store.isSelected(1)).toBeTruthy();
    expect(store.isSelected(2)).toBeFalsy();
  });
});

describe('isSelectable', () => {
  test('Check if item is selectable', () => {
    const store = new SelectionStore<number>({
      list: new ArrayStore<number>([1, 2]),
      canSelect: (item: number): boolean => item === 1,
    });
    expect(store.isEmpty).toBeTruthy();
    expect(store.isSelectable(1)).toBeTruthy();
    expect(store.isSelectable(2)).toBeFalsy();
  });
});
