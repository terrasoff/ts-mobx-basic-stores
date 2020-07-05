import { ArrayStore } from '@src/Array';

export type SelectionStoreOptions<T> = {

  list: ArrayStore<T>;

  canSelect?: (item: T) => boolean;

}
