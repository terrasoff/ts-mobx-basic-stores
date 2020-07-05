import { TimerStoreOptions } from './TimerStoreOptions';

export class TimerStore {

  private _timer: NodeJS.Timer;

  private readonly _options: TimerStoreOptions;

  private readonly _operation: VoidFunction;

  constructor(
    operation: VoidFunction,
    options: TimerStoreOptions
  ) {
    this._options = options;
    this._operation = operation;

    this.start = this.start.bind(this);
  }

  public start(): void {
    clearInterval(this._timer);
    this._operation();
    this._timer = setInterval(this._operation, this._options.timout);
  }

  public stop(): void {
    clearInterval(this._timer);
  }

}
