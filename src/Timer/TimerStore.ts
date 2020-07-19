import { ValueStore } from '../Value';
import { computed } from 'mobx';
import { NumberOfMilliseconds, UnixTimestamp } from '../Types';
import { TimerStoreOptions } from './TimerStoreOptions';
import { AsyncOperationStore } from '@src/AsyncOperation';

export class TimerStore {

  private readonly _timeout: NumberOfMilliseconds;

  private readonly _operation: AsyncOperationStore<void>;

  private readonly _timer = new ValueStore<NodeJS.Timer>();

  private readonly _options: TimerStoreOptions;

  private _startedAt = new ValueStore<UnixTimestamp>();

  private _doneAt = new ValueStore<UnixTimestamp>();

  private _canceledAt = new ValueStore<UnixTimestamp>();

  constructor(
    operation: AsyncOperationStore<void>,
    timout: NumberOfMilliseconds,
    options: Partial<TimerStoreOptions> = {},
  ) {
    this.start = this.start.bind(this);
    this.cancel = this.cancel.bind(this);

    this._operation = operation;
    this._timeout = timout;
    this._options = Object.assign(
      {
        // add default options if required
      },
      options,
    );
  }

  @computed
  public get startedAt(): number {
    return this._startedAt.value;
  }

  @computed
  public get doneAt(): number {
    return this._doneAt.value;
  }

  @computed
  public get canceledAt(): number {
    return this._canceledAt.value;
  }

  @computed
  public get isStarted(): boolean {
    return (
      !this._startedAt.isDefault
      && !this.isCanceled
    );
  }

  @computed
  public get isDone(): boolean {
    return (
      !this._doneAt.isDefault
      && !this.isCanceled
    );
  }

  @computed
  public get isCanceled(): boolean {
    return !this._canceledAt.isDefault;
  }

  @computed
  public get isRunning(): boolean {
    return (
      this.isStarted
      && !this.isCanceled
      && !this.isDone
    );
  }

  public async start(): Promise<void> {
    if (this.isRunning) {
      return;
    }

    this._doneAt.reset();
    this._canceledAt.reset();
    this._startedAt.set(new Date().getTime());

    await this._operation.execute();

    this._doneAt.set(new Date().getTime());
    this.scheduleNextLoop();
  }

  private scheduleNextLoop(): void {
    if (this._options.delayBetweenLoops) {
      this._timer.set(
        setInterval(
          this.start,
          this._timeout,
        )
      );
    }
  }

  public async cancel(): Promise<void> {
    this.clearInterval();
    if (this._operation.abort) {
      await this._operation.abort();
    }
    this._canceledAt.set(new Date().getTime());
  }

  private clearInterval(): void {
    clearInterval(this._timer.value);
    this._timer.reset();
  }

  public stop(): void {
    this.cancel();
  }

}
