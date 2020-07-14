import { action, computed, observable } from 'mobx';

export class NumericStore {

  @observable
  private _value: number;

  constructor(value: number) {
    this.add = this.add.bind(this);
    this.subtract = this.subtract.bind(this);
    this.multiply = this.multiply.bind(this);
    this.divide = this.divide.bind(this);
    this.increment = this.increment.bind(this);
    this.decrement = this.decrement.bind(this);
    this.set = this.set.bind(this);

    this._value = value;
  }

  @computed
  public get value(): number {
    return this._value;
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

  // add method on demand

}
