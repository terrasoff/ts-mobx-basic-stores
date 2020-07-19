import { action, computed, observable } from 'mobx';
import { OperationState } from './OperationState';
import { OperationStateType } from "./Types";

export class OperationStateStore {

  @observable
  private _status: OperationState = OperationState.Idle;

  constructor() {
    this.idle = this.idle.bind(this);
    this.start = this.start.bind(this);
    this.done = this.done.bind(this);
    this.abort = this.abort.bind(this);
    this.fail = this.fail.bind(this);
  }

  @computed
  public get status(): OperationState {
    return this._status;
  }

  @computed
  public get isIdle(): boolean {
    return this._status === OperationState.Idle;
  }

  @computed
  public get isRunning(): boolean {
    return this._status === OperationState.Running;
  }

  @computed
  public get isPaused(): boolean {
    return this._status === OperationState.Paused;
  }

  @computed
  public get isDone(): boolean {
    return this._status === OperationState.Done;
  }

  @computed
  public get isAborted(): boolean {
    return this._status === OperationState.Aborted;
  }

  @computed
  public get isFailed(): boolean {
    return this._status === OperationState.Failed;
  }

  @computed
  public get isCompleted(): boolean {
    return [
      OperationState.Done,
      OperationState.Aborted,
      OperationState.Failed
    ].includes(this._status);
  }

  @computed
  public get isNotCompleted(): boolean {
    return !this.isCompleted;
  }

  @action
  public idle(): void {
    this._status = OperationState.Idle;
  }

  @action
  public start(): void {
    this._status = OperationState.Running;
  }

  @action
  public pause(): void {
    this._status = OperationState.Paused;
  }

  @action
  public done(): void {
    this._status = OperationState.Done;
  }

  @action
  public abort(): void {
    this._status = OperationState.Aborted;
  }

  @action
  public fail(): void {
    this._status = OperationState.Failed;
  }

  @computed
  public get current(): OperationStateType {
    return {
      isIdle: this.isIdle,
      isRunning: this.isRunning,
      isPaused: this.isPaused,
      isDone: this.isDone,
      isAborted: this.isAborted,
      isFailed: this.isFailed,
    };
  }

}
