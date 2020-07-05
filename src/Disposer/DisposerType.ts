export type DisposerMethodType = () => Promise<void>;

export type DisposerType = {

  method: DisposerMethodType;

  isDisposed: boolean;

}