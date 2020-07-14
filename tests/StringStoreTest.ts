import { StringStore } from '@src';

test('set', () => {
  const store = new StringStore();
  expect(store.value).toEqual('');
  const str = 'hello';
  expect(store.set(str).value).toEqual(str);
});
test('concat', () => {
  const store = new StringStore('hello');
  const str = ' world';
  expect(store.concat(str).value).toEqual('hello world');
});
