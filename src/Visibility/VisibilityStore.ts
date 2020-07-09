import { action, computed, observable } from 'mobx';

export class VisibilityStore {

  @observable
  private _isVisible: boolean = false;

  constructor(isVisible: boolean = false) {
    this.show = this.show.bind(this);
    this.hide = this.hide.bind(this);
    this.toggle = this.toggle.bind(this);

    isVisible
      ? this.show()
      : this.hide();
  }

  @computed
  public get isHidden(): boolean {
    return !this._isVisible;
  }

  @computed
  public get isVisible(): boolean {
    return this._isVisible;
  }

  @action
  public show(): void {
    this._isVisible = true;
  }

  @action
  public hide(): void {
    this._isVisible = false;
  }

  @action
  public toggle(): void {
    this._isVisible = !this._isVisible;
  }

}
