import { action, computed, observable } from 'mobx';
import { ValueStoreOptions } from './ValueStoreOptions';

type ScalarValue =
  // TODO extend me if required
  string
  | number
  | boolean
  | Date;

export class ValueStore<T extends ScalarValue> {

  private _defaultValue: T;

  @observable
  private _value: T;

  constructor(
    value: T = undefined,
    options: ValueStoreOptions<T> = {}
  ) {
    this.set = this.set.bind(this);
    this.reset = this.reset.bind(this);

    this._value = value;
    this._defaultValue = options?.defaultValue;
  }

  @computed
  public get value(): T {
    return this._value;
  }

  @computed
  public get isDefault(): boolean {
    return this._value === this._defaultValue;
  }

  @action
  public set(value: T): void {
    this._value = value;
  }

  @action
  public reset(): void {
    this.set(this._defaultValue);
  }

}
