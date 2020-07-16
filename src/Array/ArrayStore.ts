import { action, computed, observable, toJS } from 'mobx';
import { ArrayFilterPredicateType } from './Types';
import { ArrayElementNotFoundError, ArrayIndexNotFoundError } from './Errors';

export class ArrayStore<T> {

  @observable
  private _items = new Array<T>();

  private readonly _defaultValue: Array<T>;

  constructor(
    items: Array<T> = []
  ) {
    this.insert = this.insert.bind(this);
    this.add = this.add.bind(this);
    this.at = this.at.bind(this);
    this.remove = this.remove.bind(this);
    this.removeAt = this.removeAt.bind(this);
    this.splice = this.splice.bind(this);
    this.clear = this.clear.bind(this);
    this.some = this.some.bind(this);
    this.find = this.find.bind(this);
    this.findIndex = this.findIndex.bind(this);
    this.update = this.update.bind(this);
    this.updateByIndex = this.updateByIndex.bind(this);
    this.setItems = this.setItems.bind(this);
    this.reset = this.reset.bind(this);
    this.toggle = this.toggle.bind(this);

    this._defaultValue = items;
    this._items = items;
  }

  @computed
  public get isDefault(): boolean {
    const a = this._defaultValue;
    const b = this.items;

    if (a === b) {
      return true;
    }
    if (a.length !== b.length) {
      return false;
    }

    for (var i = 0; i < a.length; ++i) {
      if (a[i] !== b[i]) {
        return false;
      }
    }

    return true;
  }

  @computed
  public get items(): Array<T> {
    return this._items;
  }

  @computed
  public get count(): number {
    return this._items.length;
  }

  @computed
  public get isEmpty(): boolean {
    return this._items.length === 0;
  }

  @computed
  public get first(): T | undefined {
    return this._items[0] || undefined;
  }

  @computed
  public get last(): T | undefined {
    return this.items[this.items.length - 1] || undefined;
  }

  @action
  public add(...item: Array<T>): this {
    this._items.push(...item);

    return this;
  }

  public at(index: number): T {
    return toJS(this._items)[index] || undefined;
  }

  @action
  public setItems(items: Array<T>): this {
    this._items = items;

    return this;
  }

  @action
  public insert(index: number, item: T): this {
    this._items.splice(index, 0, item);

    return this;
  }

  public remove(item: T): boolean {
    const itemIndex = this._items.findIndex(x => x === item);

    const itemWasFound = itemIndex > -1;
    if (itemWasFound) {
      this.removeAt(itemIndex);

      return true;
    }

    return false;
  }

  @action
  public removeAt(index: number): boolean {
    if (
      this.isEmpty
      || this._items.length < index
    ) {
      return false;
    }

    this._items.splice(index, 1);

    return true;
  }

  public filter(predicate: (value: T) => boolean): this {
    this.setItems(
      this._items.filter(predicate)
    );

    return this;
  }

  @action
  public splice(index: number, count: number): this {
    this._items.splice(index, count);

    return this;
  }

  public some(item: T): boolean {
    return this._items.some(x => item === x);
  }

  public find(
    predicate: (
      this: void,
      value: T,
      index: number,
      obj: Array<T>
    ) => unknown, thisArg?: any
  ): T | undefined {
    return this._items.find(predicate, thisArg);
  }

  public findIndex(predicate: ArrayFilterPredicateType<T>, thisArg?: any): number {
    return this._items.findIndex(predicate, thisArg);
  }

  @action
  public updateByIndex(index: number, value: T): this {
    const items = toJS(this._items);
    if (items[index] === undefined) {
      throw new ArrayIndexNotFoundError(index);
    }

    this._items[index] = value;

    return this;
  }

  @action
  public update(predicate: ArrayFilterPredicateType<T>, value: T): this {
    const index = this.findIndex(predicate);

    if (index === -1) {
      throw new ArrayElementNotFoundError();
    }

    this._items[index] = value;

    return this;
  }

  public reset(): this {
    this.setItems(this._defaultValue);

    return this;
  }

  public clear(): this {
    this.setItems([]);

    return this;
  }

  public toggle(item: T): this {
    this.some(item)
      ? this.remove(item)
      : this.add(item);

    return this;
  }

}
