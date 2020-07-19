import { AsyncOperationStore, TimerStore } from '@src';
import { when } from 'mobx';

test('constructor', () => {
  const execute = jest.fn();
  const operation = new AsyncOperationStore<void>(execute);
  const store = new TimerStore(operation, 1);

  expect(store.isStarted).toBeFalsy();
  expect(store.isDone).toBeFalsy();
  expect(store.isCanceled).toBeFalsy();
  expect(store.startedAt).toBeUndefined();
  expect(store.doneAt).toBeUndefined();
  expect(store.canceledAt).toBeUndefined();
});
test('Check start to done transition', async(): Promise<void> => {
  const execute = jest.fn();
  const operation = new AsyncOperationStore<void>(execute);
  const store = new TimerStore(operation, 1);
  const promise = store.start();
  expect(store.isRunning).toBeTruthy();
  expect(store.isCanceled).toBeFalsy();
  expect(store.isDone).toBeFalsy();

  await promise;

  expect(store.isRunning).toBeFalsy();
  expect(store.isCanceled).toBeFalsy();
  expect(store.isDone).toBeTruthy();
  expect(execute.mock.calls.length).toEqual(1);
});
test('Check start to cancel transition', async(): Promise<void> => {
  const execute = jest.fn();
  const abort = jest.fn();
  const operation = new AsyncOperationStore<void>(execute, { abort });
  const store = new TimerStore(operation, 1);
  await Promise.all([
    store.start(),
    store.cancel(),
  ]);
  expect(store.isCanceled).toBeTruthy();
  expect(store.isRunning).toBeFalsy();
  expect(store.isDone).toBeFalsy();
  expect(execute.mock.calls.length).toEqual(1);
  expect(abort.mock.calls.length).toEqual(1);
});
describe('Check loop', () => {
  test('No loop configured', async(): Promise<void> => {
    const execute = jest.fn();
    const abort = jest.fn();
    const delayBetweenLoops = 1;
    const operation = new AsyncOperationStore<void>(execute, { abort });
    const store = new TimerStore(operation, 1);
    store.start();
    await when((): boolean => store.isDone);
    expect(execute.mock.calls.length).toEqual(1);
    const result = when((): boolean => store.isRunning, { timeout: delayBetweenLoops });
    expect(result).rejects.toThrow();
    expect(execute.mock.calls.length).toEqual(1);
  });
  test('Loop is configured', async(): Promise<void> => {
    const execute = jest.fn();
    const abort = jest.fn();
    const operation = new AsyncOperationStore<void>(execute, { abort });
    const store = new TimerStore(operation, 1, { delayBetweenLoops: 1 });
    store.start();
    await when((): boolean => store.isDone);
    expect(execute.mock.calls.length).toEqual(1);
    await when((): boolean => store.isRunning);
    expect(store.isRunning).toBeTruthy();
    await when((): boolean => store.isDone);
    expect(store.isDone).toBeTruthy();
    expect(execute.mock.calls.length).toEqual(2);
    store.stop();
  });
});
