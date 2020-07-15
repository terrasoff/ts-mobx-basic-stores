import { BooleanStore } from '@src';

test('Default value is undefined', () => {
  const store = new BooleanStore();
  expect(store.undefined).toBeTruthy();
});
test('Default value is false', () => {
  const store = new BooleanStore(false);
  expect(store.false).toBeTruthy();
});
test('Default value is true', () => {
  const store = new BooleanStore(true);
  expect(store.true).toBeTruthy();
});
test('Set to true', () => {
  const store = new BooleanStore();
  store.setTrue();
  expect(store.true).toBeTruthy();
});
test('Set to false', () => {
  const store = new BooleanStore();
  store.setFalse();
  expect(store.false).toBeTruthy();
});
test('Set to undefined', () => {
  const store = new BooleanStore();
  store.setUndefined();
  expect(store.undefined).toBeTruthy();
});
test('Toggle undefined value', () => {
  const store = new BooleanStore();
  store.toggle();
  expect(store.undefined).toBeTruthy();
});
test('Toggle true value', () => {
  const store = new BooleanStore(true);
  store.toggle();
  expect(store.false).toBeTruthy();
});
test('Toggle false value', () => {
  const store = new BooleanStore(false);
  store.toggle();
  expect(store.true).toBeTruthy();
});
