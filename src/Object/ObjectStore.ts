import { action, computed, observable } from 'mobx';
import { ObjectStoreOptions } from './ObjectStoreOptions';

export class ObjectStore<T extends Object, K extends keyof T = keyof T> {

  private _defaultValue: T;

  @observable
  private _value: T;

  constructor(
    value: T = undefined,
    options: ObjectStoreOptions<T> = {}
  ) {
    this.set = this.set.bind(this);
    this.reset = this.reset.bind(this);
    this.change = this.change.bind(this);

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

  @action
  public change(
    key: K,
    value: T[K],
  ): this {
    this._value[key] = value;

    return this;
  }

}
