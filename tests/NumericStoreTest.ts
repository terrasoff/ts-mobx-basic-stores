import { NumericStore } from '@src';

test('add', () => {
  const store = new NumericStore(0);
  expect(store.add(1).value).toEqual(1);
  expect(store.add(1).value).toEqual(2);
});
test('subtract', () => {
  const store = new NumericStore(0);
  expect(store.subtract(1).value).toEqual(-1);
  expect(store.subtract(1).value).toEqual(-2);
});
test('multiply', () => {
  const store = new NumericStore(1);
  expect(store.multiply(2).value).toEqual(2);
  expect(store.multiply(2).value).toEqual(4);
});
test('divide', () => {
  const store = new NumericStore(8);
  expect(store.divide(2).value).toEqual(4);
  expect(store.divide(2).value).toEqual(2);
});
test('increment', () => {
  const store = new NumericStore(8);
  expect(store.increment().value).toEqual(1);
  expect(store.increment().value).toEqual(2);
});
test('decrement', () => {
  const store = new NumericStore(8);
  expect(store.decrement().value).toEqual(-1);
  expect(store.decrement().value).toEqual(-2);
});
test('set', () => {
  const store = new NumericStore(8);
  expect(store.set(10).value).toEqual(10);
});
