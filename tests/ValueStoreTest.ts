import { ValueStore } from '@src';

describe('Test object store', () => {

  test('Check default', () => {
    const store = new ValueStore();

    expect(store.value).toBeUndefined();
    expect(store.isDefault).toBeTruthy();
  });

  test('Check value', () => {
    const value = 'value';
    const store = new ValueStore<string>(value);

    expect(store.value).toEqual(value);
    expect(store.isDefault).toBeFalsy();
    store.reset();
    expect(store.isDefault).toBeTruthy();
  });

});
