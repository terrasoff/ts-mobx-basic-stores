export type AsyncOperationStoreOptions = {

  preventDoubleSubmission?: boolean;

  errorHandler?(e: Error): void;

  numberOfRetries?: number;

}
