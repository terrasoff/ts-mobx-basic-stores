import { action, computed, observable } from 'mobx';

export class BooleanStore {

  @observable
  private _value: boolean | undefined;

  constructor(value: boolean = undefined) {
    this.toggle = this.toggle.bind(this);
    this.setTrue = this.setTrue.bind(this);
    this.setFalse = this.setFalse.bind(this);

    this._value = value;
  }

  @computed
  public get undefined(): boolean {
    return this._value === undefined;
  }

  @computed
  public get true(): boolean {
    return this._value === true;
  }

  @computed
  public get false(): boolean {
    return this._value === false;
  }

  @action
  public toggle(): void {
    if (this._value !== undefined) {
      this._value = !this._value;
    }
  }

  @action
  public setTrue(): void {
    this._value = true;
  }

  @action
  public setFalse(): void {
    this._value = false;
  }

  @action
  public setUndefined(): void {
    this._value = undefined;
  }

}
