import { action, computed, observable } from 'mobx';

export class BooleanStore {

  @observable
  private _value: boolean | undefined;

  constructor(value: boolean = undefined) {
    this.toggle = this.toggle.bind(this);
    this.true = this.true.bind(this);
    this.false = this.false.bind(this);

    this._value = value;
  }

  @computed
  public get isUndefined(): boolean {
    return this._value === undefined;
  }

  @computed
  public get isTruthy(): boolean {
    return this._value === true;
  }

  @computed
  public get isFalsy(): boolean {
    return this._value === false;
  }

  @action
  public toggle(): void {
    if (this._value !== undefined) {
      this._value = !this._value;
    }
  }

  @action
  public true(): void {
    this._value = true;
  }

  @action
  public false(): void {
    this._value = false;
  }

  @action
  public undefined(): void {
    this._value = undefined;
  }

}
