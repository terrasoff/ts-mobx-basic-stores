import { AsyncOperationStore, WrongNumberOfRetriesError } from '@src';

const emptyCallback = (): Promise<number> => new Promise<number>(resolve => resolve(1));

describe('constructor', () => {
  test('Wrong number of retries', () => {
    expect(() => {
      new AsyncOperationStore<void, number>(emptyCallback, {
        numberOfRetries: -1,
      });
    }).toThrow(WrongNumberOfRetriesError);
  });
});
describe('execute', () => {
  test('Successful execute flow', async(): Promise<void> => {
    const operation = jest.fn(emptyCallback);

    const store = new AsyncOperationStore<void, number>(operation);
    expect(store.state.isIdle).toBeTruthy();
    const promise = store.execute();
    expect(store.state.isRunning).toBeTruthy();
    const result = await promise;
    expect(result).toEqual(1);
    expect(result).toEqual(store.result);
    expect(store.state.isDone).toBeTruthy();
    expect(operation.mock.calls.length).toBe(1);
  });
  test('Single submission', async(): Promise<void> => {
    const operation = jest.fn(emptyCallback);

    const store = new AsyncOperationStore<void, number>(operation);
    const promise = store.execute();
    store.execute();
    await promise;
    expect(operation.mock.calls.length).toBe(1);
  });
});
describe('execute with retries', () => {
  test('No retries if execution if successful', async(): Promise<void> => {
    const operation = jest.fn(emptyCallback);

    const store = new AsyncOperationStore<void, number>(operation, {
      numberOfRetries: 2,
    });
    await store.execute();
    expect(operation.mock.calls.length).toBe(1);
  });
  test('Retry on failure', () => {
    const operation = jest.fn(() => {
      throw new Error('Some error.');
    });

    const numberOfRetries = 2;
    const store = new AsyncOperationStore<void, number>(operation, {
      numberOfRetries,
    });
    expect(store.execute()).rejects.toBeInstanceOf(Error);
    expect(store.error).toBeInstanceOf(Error);
    expect(operation.mock.calls.length).toBe(numberOfRetries + 1);
    expect(store.state.isFail).toBeTruthy();
  });
});
