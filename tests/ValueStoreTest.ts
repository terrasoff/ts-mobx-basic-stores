import { ValueStore } from '@src';

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
describe('is', () => {
  test('true', () => {
    const value = 'value';
    const store = new ValueStore<string>(value);
    expect(store.is(value)).toBeTruthy();
  });
  test('false', () => {
    const value = 'value1';
    const store = new ValueStore<string>(value);
    expect(store.is('value2')).toBeFalsy();
  });
});