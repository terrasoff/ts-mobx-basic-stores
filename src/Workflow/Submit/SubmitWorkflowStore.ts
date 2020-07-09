import { OperationStateStore, ValueBoxStore } from "@stores/Composites";
import { lazyInject, ServiceIdentifier } from "@config";
import { IErrorHandlerService } from "@services";
import { computed } from "mobx";
import { SubmitWorkflowStoreOptions } from "./SubmitWorkflowStoreOptions";

// TODO change types order to params/result

export class SubmitWorkflowStore<TResult = void, TParams = void> {

  @lazyInject(ServiceIdentifier.ErrorHandler)
  private readonly _errorHandler: IErrorHandlerService;

  private readonly _options: SubmitWorkflowStoreOptions;

  public readonly state = new OperationStateStore();

  private readonly _result = new ValueBoxStore<TResult>()

  private readonly _operation: (params: TParams) => Promise<TResult>;

  constructor(
    operation: (params: TParams) => Promise<TResult>,
    options: Partial<SubmitWorkflowStoreOptions> = {},
  ) {
    this._options = Object.assign(
      {
        preventDoubleSubmission: true,
      },
      options,
    );
    this._operation = operation;

    this.submit = this.submit.bind(this);
  }

  public async submit(params: TParams): Promise<FormSubmissionErrors> {
    const state = this.state;

    if (
      this._options.preventDoubleSubmission
      && state.isRunning
    ) {
      return;
    }

    try {
      this._result.reset();
      state.start();
      const result = await this._operation(params);
      this._result.set(result);
      state.success();
    } catch (e) {
      state.fail();
      return this._errorHandler.handle(e);
    }
  }

  @computed
  public get result(): TResult {
    return this._result.value;
  }

}
