export class WrongNumberOfRetriesError extends Error {

  constructor() {
    super('The option "numberOfRetries" can not be less that 0.');
  }

}
