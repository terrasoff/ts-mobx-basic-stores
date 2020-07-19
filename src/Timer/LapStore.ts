import { ValueStore } from '../Value';
import { computed } from 'mobx';
import { UnixTimestamp } from '../Types';
import { NumericStore } from '@src';

/**
 * TODO Add lap timer support
 */
export class LapStore {

  private readonly _startedAt = new ValueStore<UnixTimestamp>();

  private readonly _pausedAt = new ValueStore<UnixTimestamp>();

  private readonly _timeRemained = new NumericStore(0);
  
  private readonly _count = new NumericStore(0);

  private readonly _operation: VoidFunction;

  constructor(
    operation: VoidFunction,
  ) {
    this.start = this.start.bind(this);

    this._operation = operation;
  }

  @computed
  public get startedAt(): number {
    return this._startedAt.value;
  }

  @computed
  public get pausedAt(): number {
    return this._pausedAt.value;
  }

  @computed
  public get timeRemained(): number {
    return this._timeRemained.value;
  }

  @computed
  public get count(): number {
    return this._count.value;
  }

  @computed
  public get isRunning(): boolean {
    return (
      !this._startedAt.isDefault
      && this._pausedAt.isDefault
    );
  }

  @computed
  public get isStopped(): boolean {
    return !this.isRunning;
  }

  @computed
  public get isPaused(): boolean {
    return (
      !this._pausedAt.isDefault
      && !this.isRunning
    );
  }

  private finish(): void {
    this._timeRemained.reset();
    this._count.increment();
  }

  private async start(): Promise<void> {
    this._pausedAt.reset();
    this._startedAt.set(new Date().getTime());
    await this._operation();
    this.finish();
  }

}
