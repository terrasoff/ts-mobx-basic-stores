import { ToggleStateType } from './ToggleStateType';
import { computed } from 'mobx';
import { ValueStore } from '@src';

export class ToggleStateStore {

  private readonly _state: ValueStore<ToggleStateType>

  @computed
  public get isOn(): boolean {
    return this._state.value === 'on';
  }

  @computed
  public get isOff(): boolean {
    return this._state.value === 'off';
  }

  @computed
  public get isIndeterminate(): boolean {
    return this._state.value === 'indeterminate';
  }

  constructor(state: ToggleStateType = 'off') {
    this._state = new ValueStore<ToggleStateType>(state);

    this.on = this.on.bind(this);
    this.off = this.off.bind(this);
    this.toggle = this.toggle.bind(this);
    this.indeterminate = this.indeterminate.bind(this);
  }

  public toggle(): void {
    const value = this._state.value === 'on' ? 'off' : 'on';
    this._state.set(value);
  }

  public on(): void {
    this._state.set('on');
  }

  public off(): void {
    this._state.set('off');
  }

  public indeterminate(): void {
    this._state.set('indeterminate');
  }

}
