import { action, computed, observable } from 'mobx';

export class StringStore {

  @observable
  private _value: string;

  constructor(value: string = '') {
    this.concat = this.concat.bind(this);

    this._value = value;
  }

  @computed
  public get value(): string {
    return this._value;
  }

  @action
  public concat(value: string): this {
    this._value = this._value + value;

    return this;
  }

  @action
  public set(value: string): this {
    this._value = value;

    return this;
  }

  // add method on demand

}
