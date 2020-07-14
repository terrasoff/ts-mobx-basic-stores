import { OperationStateStore } from '@src';

describe('Test object store', () => {

  test('Idle by default', () => {
    const store = new OperationStateStore();
    expect(store.isIdle).toBeTruthy();
  });

  test('start', () => {
    const store = new OperationStateStore();

    store.start();
    expect(store.isRunning).toBeTruthy();
  });

  test('pause', () => {
    const store = new OperationStateStore();

    store.pause();
    expect(store.isPaused).toBeTruthy();
  });

  test('abort', () => {
    const store = new OperationStateStore();

    store.abort();
    expect(store.isAborted).toBeTruthy();
    expect(store.isCompleted).toBeTruthy();
  });

  test('pause', () => {
    const store = new OperationStateStore();

    store.fail();
    expect(store.isFailed).toBeTruthy();
  });

  test('pause', () => {
    const store = new OperationStateStore();

    store.done();
    expect(store.isDone).toBeTruthy();
    expect(store.isCompleted).toBeTruthy();
  });

});
