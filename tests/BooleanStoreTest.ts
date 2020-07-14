import { BooleanStore } from '@src';

test('Default value is undefined', () => {
  const store = new BooleanStore();
  expect(store.isUndefined).toBeTruthy();
});
test('Default value is false', () => {
  const store = new BooleanStore(false);
  expect(store.isFalsy).toBeTruthy();
});
test('Default value is true', () => {
  const store = new BooleanStore(true);
  expect(store.isTruthy).toBeTruthy();
});
test('Set to true', () => {
  const store = new BooleanStore();
  store.true();
  expect(store.isTruthy).toBeTruthy();
});
test('Set to false', () => {
  const store = new BooleanStore();
  store.false();
  expect(store.isFalsy).toBeTruthy();
});
test('Set to undefined', () => {
  const store = new BooleanStore();
  store.undefined();
  expect(store.isUndefined).toBeTruthy();
});
test('Toggle undefined value', () => {
  const store = new BooleanStore();
  store.toggle();
  expect(store.isUndefined).toBeTruthy();
});
test('Toggle true value', () => {
  const store = new BooleanStore(true);
  store.toggle();
  expect(store.isFalsy).toBeTruthy();
});
test('Toggle false value', () => {
  const store = new BooleanStore(false);
  store.toggle();
  expect(store.isTruthy).toBeTruthy();
});
