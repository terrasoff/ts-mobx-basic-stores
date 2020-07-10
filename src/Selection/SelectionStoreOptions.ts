import { ArrayStore } from '../Array';

export type SelectionStoreOptions<T> = {

  list: ArrayStore<T>;

  canSelect?: (item: T) => boolean;

}
