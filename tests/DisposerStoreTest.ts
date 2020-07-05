import { DisposerStore } from '@src';

describe('Test disposer store', () => {

  test('Call disposer once', async () => {
    const store = new DisposerStore();

    const disposer = jest.fn();
    store.push(disposer);
    await store.dispose();
    expect(disposer.mock.calls.length).toEqual(1);
    await store.dispose();
    expect(disposer.mock.calls.length).toEqual(1);
  });

});
