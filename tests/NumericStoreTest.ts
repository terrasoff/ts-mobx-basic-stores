import { NumericStore } from '@src';

describe('isDefault', () => {
  test('Positive', () => {
    const defaultValue = 1;
    const store = new NumericStore(defaultValue);
    expect(store.value).toEqual(defaultValue);
    expect(store.isDefault).toBeTruthy();
  });
  test('Positive using options', () => {
    const value = 1;
    const defaultValue = 2;
    const store = new NumericStore(value, { defaultValue });
    expect(store.value).toEqual(value);
    expect(store.isDefault).toBeFalsy();
    expect(store.set(defaultValue).value).toEqual(defaultValue);
    expect(store.isDefault).toBeTruthy();
  });
  test('Negative', () => {
    const defaultValue = 1;
    const anotherValue = 2;
    const store = new NumericStore(defaultValue);
    expect(store.set(anotherValue).value).toEqual(anotherValue);
    expect(store.isDefault).toBeFalsy();
  });
});
describe('isPositive', () => {
  test('Zero is not positive', () => {
    const store = new NumericStore(0);
    expect(store.isPositive).toBeFalsy();
  });
  test('Negative is not positive', () => {
    const store = new NumericStore(-1);
    expect(store.isPositive).toBeFalsy();
  });
  test('Positive is positive', () => {
    const store = new NumericStore(1);
    expect(store.isPositive).toBeTruthy();
  });
});
describe('isNegative', () => {
  test('Zero is not negative', () => {
    const store = new NumericStore(0);
    expect(store.isNegative).toBeFalsy();
  });
  test('Positive is not negative', () => {
    const store = new NumericStore(1);
    expect(store.isNegative).toBeFalsy();
  });
  test('Negative is negative', () => {
    const store = new NumericStore(-1);
    expect(store.isNegative).toBeTruthy();
  });
});
describe('isZero', () => {
  test('Positive is not negative', () => {
    const store = new NumericStore(1);
    expect(store.isZero).toBeFalsy();
  });
  test('Negative is negative', () => {
    const store = new NumericStore(-1);
    expect(store.isZero).toBeFalsy();
  });
  test('Zero is zero', () => {
    const store = new NumericStore(0);
    expect(store.isZero).toBeTruthy();
  });
});
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
  const store = new NumericStore(0);
  expect(store.increment().value).toEqual(1);
  expect(store.increment().value).toEqual(2);
});
test('decrement', () => {
  const store = new NumericStore(0);
  expect(store.decrement().value).toEqual(-1);
  expect(store.decrement().value).toEqual(-2);
});
test('set', () => {
  const store = new NumericStore(8);
  expect(store.set(10).value).toEqual(10);
});
test('reset', () => {
  const defaultValue = 1;
  const anotherValue = 2;
  const store = new NumericStore(defaultValue);
  expect(store.isDefault).toBeTruthy();
  store.set(anotherValue);
  expect(store.isDefault).toBeFalsy();
  expect(store.reset().value).toEqual(defaultValue);
  expect(store.isDefault).toBeTruthy();
});
