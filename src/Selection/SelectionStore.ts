import { computed } from 'mobx';
import { ArrayStore } from '../Array';
import { SelectionStoreOptions } from './SelectionStoreOptions';

export class SelectionStore<T> {

  private readonly _canSelect: (item: T) => boolean;

  public readonly list = new ArrayStore<T>();

  public readonly selected = new ArrayStore<T>();

  constructor(options: SelectionStoreOptions<T>) {
    this.selectAll = this.selectAll.bind(this);
    this.clear = this.clear.bind(this);
    this.toggle = this.toggle.bind(this);
    this.toggleAll = this.toggleAll.bind(this);
    this.isSelected = this.isSelected.bind(this);
    this.selectOne = this.selectOne.bind(this);

    this.list = options.list;
    this._canSelect = options.canSelect || ((): boolean => true);
  }

  @computed
  public get isFull(): boolean {
    return this.list.count === this.selected.count;
  }

  @computed
  public get isPartial(): boolean {
    return (
      !this.isEmpty
      && this.list.count !== this.selected.count
    );
  }

  @computed
  public get isEmpty(): boolean {
    return this.selected.isEmpty;
  }

  public selectAll(): this {
    this.selected.setItems(
      this.list.items.filter(this._canSelect)
    );

    return this;
  }

  public clear(): this {
    this.selected.clear();

    return this;
  }

  public selectOne(item: T): this {
    this.clear();
    this.selected.add(item);

    return this;
  }

  public select(item: T): this {
    if (this.isSelectable(item)) {
      // TODO check uniqueness
      this.selected.add(item);
    }

    return this;
  }

  public toggle(item: T): this {
    if (this._canSelect(item)) {
      this.selected.toggle(item);
    }

    return this;
  }

  public toggleAll(): this {
    this.isEmpty
      ? this.selectAll()
      : this.selected.clear();

    return this;
  }

  public isSelected(item: T): boolean {
    return this.selected.some(item);
  }

  public isSelectable(item: T): boolean {
    return this._canSelect(item);
  }

}
