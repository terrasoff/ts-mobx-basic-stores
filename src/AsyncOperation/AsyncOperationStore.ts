import { AsyncOperationStoreOptions } from './AsyncOperationStoreOptions';
import { OperationStateStore } from '../OperationState';
import { ObjectStore } from '../Object';
import { WrongNumberOfRetriesError } from './Errors';
import { computed } from "mobx";

export class AsyncOperationStore<P = undefined, R = void> {

  public readonly state = new OperationStateStore();

  private readonly _options: AsyncOperationStoreOptions;

  private readonly _error = new ObjectStore<Error>();

  private readonly _operation: (params: P) => Promise<R>;

  private _resultPromise: Promise<R>;

  private _params: P;

  constructor(
    operation: (params: P) => Promise<R>,
    options: Partial<AsyncOperationStoreOptions> = {},
  ) {
    this.run = this.run.bind(this);
    this.reset = this.reset.bind(this);

    this._operation = operation;
    this._options = Object.assign(
      {
        preventDoubleSubmission: true,
        numberOfRetries: 0,
      },
      options,
    );

    if (this._options.numberOfRetries < 0) {
      throw new WrongNumberOfRetriesError();
    }

    this.execute = this.execute.bind(this);
  }

  @computed
  public get error(): Error {
    return this._error.value;
  }

  public execute(params: P): Promise<R> {
    const state = this.state;
    this._params = params;

    if (
      this._options.preventDoubleSubmission
      && this._resultPromise
      && state.isRunning
    ) {
      return this._resultPromise;
    }

    state.start();
    this._resultPromise = new Promise<R>(this.run);

    return this._resultPromise;
  }

  private normalizeError(e: Error | string): Error {
    return typeof e === 'string'
      ? new Error(e)
      : e;
  }

  private async run(
    resolve: (value: R) => void,
    reject: (error: Error) => void
  ): Promise<void> {
    const state = this.state;

    let tries = this._options.numberOfRetries + 1;
    while (tries-- > 0) {
      try {
        const result = await this._operation(this._params);
        resolve(result);
        state.done();
        break;
      } catch (e) {
        if (tries > 0) {
          continue;
        }
        const error = this.normalizeError(e);
        this._error.set(error);
        state.fail();

        reject(error);
      }
    }
  }

  public reset(): void {
    this.state.idle();
  }

}
