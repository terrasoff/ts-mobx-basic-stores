export type ArrayFilterPredicateType<T> = (
  this: void,
  value: T,
  index?: number,
  obj?: Array<T>
) => unknown;
