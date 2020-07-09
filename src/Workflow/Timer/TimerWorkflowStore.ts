import { OperationStateStore, ValueBoxStore } from "@stores/Composites";
import { TimerWorkflowStoreOptions } from "./TimerWorkflowStoreOptions";

export class TimerWorkflowStore {

  private _timer: NodeJS.Timer;

  private readonly _options: TimerWorkflowStoreOptions;

  private readonly _operation: VoidFunction;

  constructor(
    operation: VoidFunction,
    options: TimerWorkflowStoreOptions
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
