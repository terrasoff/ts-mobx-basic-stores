import { TimerStore } from '@src';
import { when } from 'mobx';

test('Timer', async(): Promise<void> => {
  const fn = jest.fn();
  const store = new TimerStore(fn, 1);
  store.start();
  await when((): boolean => store.lapCount === 2);
  expect(store.isRunning).toBeTruthy();
  store.stop();
  expect(!store.isStopped).toBeTruthy();
  expect(fn.mock.calls.length).toEqual(1);
});