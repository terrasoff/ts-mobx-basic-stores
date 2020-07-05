import { IDisposerStore } from './IDisposerStore';
import { DisposerMethodType, DisposerType } from './DisposerType';

export class DisposerStore implements IDisposerStore {

  private _disposers: Array<DisposerType> = [];

  constructor() {
    this.push = this.push.bind(this);
    this.dispose = this.dispose.bind(this);
  }

  public push(...items: Array<DisposerMethodType>): void {
    this._disposers = items.map(
      method => ({
        method: method,
        isDisposed: false,
      })
    );
  }

  public async dispose(): Promise<void> {
    try {
      const methods = this._disposers.map(
        x => {
          const promise = x.method();
          if (promise instanceof Promise) {
            promise.then((): void => {
              x.isDisposed = true;
            });
          } else {
            x.isDisposed = true;
          }

          return promise;
        }
      );
      await Promise.all(methods);
    } finally {
      this._disposers = this._disposers.filter(x => !x.isDisposed);
    }
  }

}
