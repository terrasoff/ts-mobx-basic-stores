import { action, computed, observable } from 'mobx';
import { NumericStoreOptions } from './NumericStoreOptions';

export class NumericStore {

  @observable
  private _value: number;

  @observable
  private _defaultValue: number;

  constructor(
    value: number,
    options: NumericStoreOptions = {}
  ) {
    this.add = this.add.bind(this);
    this.subtract = this.subtract.bind(this);
    this.multiply = this.multiply.bind(this);
    this.divide = this.divide.bind(this);
    this.increment = this.increment.bind(this);
    this.decrement = this.decrement.bind(this);
    this.set = this.set.bind(this);

    this._value = value;
    this._defaultValue = options?.defaultValue === undefined
      ? value
      : options.defaultValue;
  }

  @computed
  public get value(): number {
    return this._value;
  }

  @computed
  public get isDefault(): boolean {
    return this._value === this._defaultValue;
  }

  @computed
  public get isNegative(): boolean {
    return this.value < 0;
  }

  @computed
  public get isPositive(): boolean {
    return this.value > 0;
  }

  @computed
  public get isZero(): boolean {
    return this.value === 0;
  }

  @action
  public add(value: number): this {
    this._value = this._value + value;

    return this;
  }

  @action
  public subtract(value: number): this {
    this._value = this._value - value;

    return this;
  }

  @action
  public multiply(value: number): this {
    this._value = this._value * value;

    return this;
  }

  @action
  public divide(value: number): this {
    this._value = this._value / value;

    return this;
  }

  @action
  public increment(): this {
    this._value = this._value + 1;

    return this;
  }

  @action
  public decrement(): this {
    this._value = this._value - 1;

    return this;
  }

  @action
  public set(value: number): this {
    this._value = value;

    return this;
  }

  @action
  public reset(): this {
    this._value = this._defaultValue;

    return this;
  }

}
