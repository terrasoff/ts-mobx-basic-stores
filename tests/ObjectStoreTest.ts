import { ObjectStore } from '@src';

type Person = {

  name: string;

}

describe('Test object store', () => {

  test('Check default', () => {
    const store = new ObjectStore<Person>();

    expect(store.value).toBeUndefined();
    expect(store.isDefault).toBeTruthy();
  });

  test('Check value', () => {
    const value: Person = { name: 'John' };
    const store = new ObjectStore<Person>(value);

    expect(store.value).toEqual(value);
    expect(store.isDefault).toBeFalsy();
    store.reset();
    expect(store.isDefault).toBeTruthy();
  });

  describe('change', () => {
    test('Change key', () => {
      const value: Person = { name: 'John' };
      const store = new ObjectStore<Person>(value);
      store.change('name', 'Jane');
      expect(store.value).toEqual({ name: 'Jane' });
    });
  });

});
