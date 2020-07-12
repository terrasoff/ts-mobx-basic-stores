import { ValueStore } from '../Value';
import { computed } from 'mobx';
import { NumberOfMilliseconds, UnixTimestamp } from '../Types';
import { TimerStoreOptions } from './TimerStoreOptions';

export class TimerStore {

  private readonly _timeout: NumberOfMilliseconds;

  private readonly _operation: VoidFunction;

  private readonly _timer = new ValueStore<NodeJS.Timer>();

  private readonly _options: TimerStoreOptions;

  private readonly _startedAt = new ValueStore<UnixTimestamp>();

  private readonly _lapStartedAt = new ValueStore<UnixTimestamp>();

  private readonly _lapPausedAt = new ValueStore<UnixTimestamp>();

  private readonly _lapTimeRemained = new ValueStore<NumberOfMilliseconds>();
  
  private readonly _lapCount = new ValueStore<number>(0, {
    defaultValue: 0,
  });

  constructor(
    operation: VoidFunction,
    timout: NumberOfMilliseconds,
    options: TimerStoreOptions,
  ) {
    this.start = this.start.bind(this);
    this.pause = this.pause.bind(this);
    this.resume = this.resume.bind(this);
    this.stop = this.stop.bind(this);
    this.startNextLap = this.startNextLap.bind(this);
    this.scheduleNextLap = this.startNextLap.bind(this);

    this._operation = operation;
    this._timeout = timout;
    this._options = options;
  }

  @computed
  public get startedAt(): number {
    return this._startedAt.value;
  }

  @computed
  public get lapStartedAt(): number {
    return this._lapStartedAt.value;
  }

  @computed
  public get lapPausedAt(): number {
    return this._lapPausedAt.value;
  }

  @computed
  public get lapTimeRemained(): number {
    return this._lapTimeRemained.value;
  }

  @computed
  public get lapCount(): number {
    return this._lapCount.value;
  }

  @computed
  public get isStarted(): boolean {
    return !this._startedAt.isDefault;
  }

  @computed
  public get isRunning(): boolean {
    return (
      !this._lapStartedAt.isDefault
      && this._lapPausedAt.isDefault
    );
  }

  @computed
  public get isPaused(): boolean {
    return (
      !this._lapPausedAt.isDefault
      && !this.isRunning
    );
  }

  private startNextLap(): void {
    this._lapTimeRemained.reset();
    this._lapStartedAt.set(new Date().getTime());
    this._lapCount.set(
      this._lapCount.value + 1
    );
  }

  private scheduleNextLap(): void {
    this.startNextLap();

    const interval = setInterval(
      async(): Promise<void> => {
        this._lapPausedAt.reset();
        await this._operation();
        this.startNextLap();
      },
      this._timeout
    );

    this._timer.set(interval);
  }

  private clearInterval(): void {
    clearInterval(this._timer.value);
    this._timer.reset();
  }

  public start(): void {
    if (!this._timer.isDefault) {
      return;
    }

    this._startedAt.set(new Date().getTime());
    this.scheduleNextLap();
  }

  public pause(): void {
    this._lapPausedAt.set(new Date().getTime());

    this._lapTimeRemained.set(
      this._lapStartedAt.value + this._timeout - this._lapPausedAt.value
    );
    this.clearInterval();
  }

  public resume(): void {
    if (this.isPaused) {
      this._lapPausedAt.reset();
      setTimeout(
        async(): Promise<void> => {
          await this._operation();
          this.scheduleNextLap();
        },
        this._lapTimeRemained.value
      );
    }
  }

  public stop(): void {
    this.clearInterval();
    this._startedAt.reset();
    this._lapCount.reset();
    this._lapTimeRemained.reset();
    this._lapStartedAt.reset();
    this._lapPausedAt.reset();
  }

}
