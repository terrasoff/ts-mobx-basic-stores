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
test('substr', () => {
  const store = new StringStore('Hello world!');
  expect(store.substr(6, 5).value).toEqual('world');
});
test('substring', () => {
  const store = new StringStore('Hello world!');
  expect(store.substring(6, 11).value).toEqual('world');
});
test('trim', () => {
  const store = new StringStore(' Hello world! ');
  expect(store.trim().value).toEqual('Hello world!');
});
test('trimLeft', () => {
  const store = new StringStore(' Hello world! ');
  expect(store.trimLeft().value).toEqual('Hello world! ');
});
test('trimRight', () => {
  const store = new StringStore(' Hello world! ');
  expect(store.trimRight().value).toEqual(' Hello world!');
});
test('toLowerCase', () => {
  const store = new StringStore('Hello world!');
  expect(store.toLowerCase().value).toEqual('hello world!');
});
test('toUpperCase', () => {
  const store = new StringStore('Hello world!');
  expect(store.toLowerCase().value).toEqual('hello world!');
});
