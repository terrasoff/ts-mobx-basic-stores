export class ArrayIndexNotFoundError extends Error {

  constructor(index: number) {
    super(`Array index ${index} was not found`);
  }

}
