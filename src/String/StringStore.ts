import { action, computed, observable } from 'mobx';
import { StringReplaceValueOrFunctionType, StringSearchValueType } from "@src/String/Types";



export class StringStore {

  @observable
  private _value: string;

  constructor(value: string = '') {
    this.concat = this.concat.bind(this);
    this.substr = this.substr.bind(this);
    this.substring = this.substring.bind(this);
    this.trim = this.trim.bind(this);
    this.trimLeft = this.trimLeft.bind(this);
    this.trimRight = this.trimRight.bind(this);
    this.toLowerCase = this.toLowerCase.bind(this);
    this.toUpperCase = this.toUpperCase.bind(this);
    this.set = this.set.bind(this);

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
  public substr(from: number, length?: number): this {
    this._value = this._value.substr(from, length);

    return this;
  }

  @action
  public substring(start: number, end?: number): this {
    this._value = this._value.substring(start, end);

    return this;
  }

  @action
  public trim(): this {
    this._value = this._value.trim();

    return this;
  }

  @action
  public trimLeft(): this {
    this._value = this._value.trimLeft();

    return this;
  }

  @action
  public trimRight(): this {
    this._value = this._value.trimRight();

    return this;
  }

  @action
  public toLowerCase(): this {
    this._value = this._value.toLowerCase();

    return this;
  }

  @action
  public toUpperCase(): this {
    this._value = this._value.toUpperCase();

    return this;
  }

  @action
  public set(value: string): this {
    this._value = value;

    return this;
  }

  // add method on demand

}
