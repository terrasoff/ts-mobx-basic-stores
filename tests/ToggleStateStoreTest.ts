import { ToggleStateStore } from '@src';

describe('Test object store', () => {

  test('Default state is off', () => {
    const store = new ToggleStateStore();
    expect(store.isOff).toBeTruthy();
  });

  test('Set off as default state', () => {
    const store = new ToggleStateStore('off');
    expect(store.isOff).toBeTruthy();
  });

  test('Set on as default state', () => {
    const store = new ToggleStateStore('on');
    expect(store.isOn).toBeTruthy();
  });

  test('Set indeterminate as default state', () => {
    const store = new ToggleStateStore('indeterminate');
    expect(store.isIndeterminate).toBeTruthy();
  });

  test('Default state is off', () => {
    const store = new ToggleStateStore();
    expect(store.isOff).toBeTruthy();
  });

  test('Set on', () => {
    const store = new ToggleStateStore();
    store.on();
    expect(store.isOn).toBeTruthy();
  });

  test('Set off', () => {
    const store = new ToggleStateStore('on');
    store.off();
    expect(store.isOff).toBeTruthy();
  });

  test('Set indeterminated', () => {
    const store = new ToggleStateStore();
    store.indeterminate();
    expect(store.isIndeterminate).toBeTruthy();
  });

});
