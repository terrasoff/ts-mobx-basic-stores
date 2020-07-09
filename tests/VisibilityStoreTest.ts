import { VisibilityStore } from '../src/Visibility';

describe('constructor', () => {
  test('Is visible', () => {
    const state = new VisibilityStore(true);
    expect(state.isVisible).toBeTruthy();
  });
  test('isHidden', () => {
    const state = new VisibilityStore();
    expect(state.isHidden).toBeTruthy();
  });
});
describe('toggle', () => {
  test('Toggle', () => {
    const state = new VisibilityStore();
    state.toggle();
    expect(state.isVisible).toBeTruthy();
  });
  test('Toggle twice', () => {
    const state = new VisibilityStore();
    state.toggle();
    expect(state.isVisible).toBeTruthy();
    state.toggle();
    expect(state.isHidden).toBeTruthy();
  });
});
describe('show', () => {
  test('Show hidden', () => {
    const state = new VisibilityStore();
    state.show();
    expect(state.isVisible).toBeTruthy();
  });
  test('Show visible', () => {
    const state = new VisibilityStore();
    state.show();
    expect(state.isVisible).toBeTruthy();
  });
});
describe('hide', () => {
  test('Hide hidden', () => {
    const state = new VisibilityStore();
    state.hide();
    expect(state.isHidden).toBeTruthy();
  });
  test('Hide visible', () => {
    const state = new VisibilityStore();
    state.hide();
    expect(state.isHidden).toBeTruthy();
  });
});